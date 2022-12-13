const puppeteer = require("puppeteer")

async function start() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    // Go to your site
    const urlArray = [
        'https://domicilios.tiendasd1.com/',

    ];
    for(var i = 0; i < urlArray.length; i++){
        const website_url = urlArray[i];
    
        await page.goto(website_url, { waitUntil: 'networkidle0'}).then(() => {
            console.log('success')
        }).catch((res) => {
            console.log('Navigation timeout of 30000 ms exceeded')
        });
        await page.screenshot({ path: `images/screenshot_full_${i+1}.jpg`});       
    }
    await browser.close()
}

start()