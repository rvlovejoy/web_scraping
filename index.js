const puppeteer = require("puppeteer")
const {PuppeteerScreenRecorder} = require('puppeteer-screen-recorder')

async function start() {
    
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    const recorder = new PuppeteerScreenRecorder(page);
    const urlArray = [
        'https://domicilios.tiendasd1.com/',
        'https://tienda.makro.com.co/',
        'https://www.oitafresh.com/',
        'https://despensa.bodegaaurrera.com.mx/',
        'https://centralmayorista.cl/',
        'https://acuenta.cl/',
    ];
    await recorder.start("output.mp4");
    
    for(var i = 0; i < urlArray.length; i++){
        const website_url = urlArray[i];
        await page.goto(website_url, { waitUntil: 'networkidle0' }).then(() => {
            console.log(page.url(),'success')
        }).catch((res) => {
            console.log(page.url(),'Navigation timeout of 30000 ms exceeded')
        });
        await page.screenshot({ path: `images/screenshot_full_${i+1}.jpg`});              
    }  
    await recorder.stop();  
    await browser.close();
   
}

start()