const puppeteer = require('puppeteer');
const fs = require('fs'); 
const path = require('path');

class PdfService{
  async montarPdf(ordem){
    let browser
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      
      const page = await browser.newPage();

      const htmlContent = this.montarHtml(defineHtml(), ordem)

      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

      const pdfBuffer = await page.pdf({ format: 'A4' });
      this.salvarLocalPdf(ordem.OrdemID, pdfBuffer)

      return pdfBuffer;
    } catch (error) {
      throw new Error('Erro ao gerar PDF: ' + error.message);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  async montarImagem(ordem) {
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();
      const htmlContent = this.montarHtml(this.defineHtml(), ordem);

      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

      const bodyHandle = await page.$('body');
      const boundingBox = await bodyHandle.boundingBox();
      await bodyHandle.dispose();
  
      const width = Math.ceil(boundingBox.width);
      const height = Math.ceil(boundingBox.height);
  
      await page.setViewport({ width, height });
  
      const screenshot = await page.screenshot({
        fullPage: true,
        type: 'png' 
      });
  
      const buffer = Buffer.from(screenshot);

      // if(Buffer.isBuffer(buffer)){
      //   throw new Error('Imagem gerada num formato incorreto')
      // }

      return buffer;
    } catch (error) {
      throw new Error('Erro ao gerar imagem: ' + error.message);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  salvarLocalPdf(ordem, pdfBuffer){
    fs.writeFileSync(`os-log/os-${ordem.OrdemID}.pdf`, pdfBuffer);
  }

  defineHtml(){
    let htmlFilePath = path.join(__dirname, '../utils/template.html');
    return fs.readFileSync(htmlFilePath, 'utf8');
  }

  montarHtml(html,ordem){
    try{
      const periodosHtml = ordem.Periodos.map(periodo =>
        `
              <div class="content-periodo">
                  <p><strong>Início:</strong> ${this.formatarDataHora(periodo.DataInicio)}</p>
                  <p><strong>Fim:</strong> ${this.formatarDataHora(periodo.DataFim)}</p>
                  <p><strong>Tempo Gasto:</strong> ${this.formatarTotal(periodo.TempoTotal)}</p>
              </div>
          `
      ).join('');

      const imagePath = path.resolve(__dirname, '../utils/atak_sistemas_logo.jpeg');
      const imageBuffer = fs.readFileSync(imagePath);
      const base64Image = imageBuffer.toString('base64');
      const imageSrc = `data:image/jpeg;base64,${base64Image}`;
    
      html = html.replace('atak_sistemas_logo.jpeg', imageSrc);

      html = html.replace('{{OrdemID}}', ordem.OrdemID)
                .replace('{{ClienteNome}}', ordem.Cliente.Nome)
                .replace('{{ProjetoNome}}', ordem.Projeto.Nome)
                .replace('{{ClienteCNPJ}}', ordem.Cliente.CNPJ)
                .replace('{{FuncionarioNome}}', ordem.Funcionario.Nome)
                .replace('{{AtividadeID}}', ordem.AtividadeID)
                .replace('{{AtividadeNome}}', ordem.Atividade.Nome)
                .replace('{{AtividadeDescricao}}', ordem.Atividade.Descricao)
                .replace('{{TempoTotal}}', this.formatarTotal(ordem.Periodos.reduce((acc, periodo) => acc + periodo.TempoTotal, 0)))
                .replace('{{#Periodos}}', periodosHtml);

      return html;
    } catch (error) {
      throw new Error('Erro ao montar PDF: ' + error.message);
    }
  }

  formatarDataHora(data){
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    const horas = String(dataObj.getHours()).padStart(2, '0');
    const minutos = String(dataObj.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
  };

  formatarTotal(hora){
    let unidade = 'horas'
    if (hora < 1){
      unidade = 'minutos'
      hora = hora * 60
    }

    return `${hora} ${unidade}`
  }
}

module.exports = PdfService