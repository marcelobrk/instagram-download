const puppeteer = require('puppeteer');
const fs = require('fs');

let getInstaPhotos = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://instagram.com/miakhalifa');

    const result = await page.evaluate(() => {
        let data = [];
        let elements = document.querySelectorAll('div.KL4Bh > img');
        for (var index = 0; index < elements.length; index++) {
            let imgLink = elements[index].src;
            data.push(imgLink);

        }
        return data;
    });

    for (index in result) {
        var viewSource = await page.goto(result[index]);
        fs.writeFile(index + ".png", await viewSource.buffer(), function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("As imagens foram salvas!");
        });
    }
    browser.close();
    return result
}

getInstaPhotos().then((value) => {
    console.log(value);
});
