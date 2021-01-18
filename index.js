
// Get environment variables for Skuid site credentials
const baseUrl = 'https://accounts.google.com/signin/v2/identifier?hl=en&passive=true&continue=https%3A%2F%2Fwww.google.com%2F%3Fgws_rd%3Dssl&ec=GAZAAQ&flowName=GlifWebSignIn&flowEntry=ServiceLogin';
const username = 'renesissocial@gmail.com';
const password = 'RENESISsocial';

require("chromedriver");

// Include selenium webdriver 
let swd = require("selenium-webdriver");
let browser = new swd.Builder();
let tab = browser.forBrowser("chrome").build();

// Step 1 - Opening the geeksforgeeks sign in page 
let tabToOpen = tab.get(baseUrl);
tabToOpen.then(function () {

    // Timeout to wait if connection is slow 
    let findTimeOutP = tab.manage().setTimeouts({
        implicit: 10000, // 10 seconds 
    });
    return findTimeOutP;
})
    .then(function () {

        // Step 2 - Finding the username input 
        let promiseUsernameBox = tab.findElement(swd.By.css("#identifierId"));
        return promiseUsernameBox;
    })
    .then(function (usernameBox) {
        // Step 3 - Entering the username 
        let promiseFillUsername = usernameBox.sendKeys(username);
        let clickBox = tab.findElement(swd.By.css('.VfPpkd-LgbsSe'));
        clickBox.click();
        return promiseFillUsername;
    })
    .then(function () {
        console.log(
            "Username entered successfully in" +
            "'login demonstration' for Google"
        );

        // Step 4 - Finding the password input 
        let promisePasswordBox = tab.findElement(swd.By.name("password"));
        return promisePasswordBox;
    })
    .then(function (passwordBox) {

        // Step 5 - Entering the password 
        let promiseFillPassword =
            passwordBox.sendKeys(password);
        return promiseFillPassword;
    })
    .then(function () {
        console.log(
            "Password entered successfully in" +
            " 'login demonstration' for GEEKSFORGEEKS"
        );

        // Step 6 - Finding the Sign In button 
        let promiseSignInBtn = tab.findElement(
            swd.By.css("#passwordNext")
        );
        return promiseSignInBtn;
    })
    .then(function (signInBtn) {

        // Step 7 - Clicking the Sign In button 
        let promiseClickSignIn = signInBtn.click();
        return promiseClickSignIn;
    })
    .then(async function () {
        return new Promise((resolve) => setTimeout(async () => {
            const meet = await tab.get('https://meet.google.com/ujb-ozsx-njn');
            resolve(true)
        }, 5000))
    })
    .then(async () => {
        // uArJ5e UQuaGc Y5sE8d uyXBBb xKiqt M9Bg4d
        // return new Promise((resolve) => setTimeout(async () => {
        //     const askToJoin = tab.findElement(swd.By.css(".M9Bg4d"));
        //     resolve(askToJoin)
        // }, 3000))
        return true;
    }).then(async (askToJoin) => {
        // askToJoin.click();
        setTimeout(() => {
            domChanged()
        }, 5000);
    })
    .catch(function (err) {
        console.log("Error ", err, " occurred!");
    });



const getFilterred = arr => arr.filter(a => a.trim().length > 1)

const info = _dom => {
    let obj = {};
    const [imgFirst] = getFilterred(_dom.split('<img class="KpxDtd r6DyN" src="'));
    obj.img = getFilterred(imgFirst.split('" alt="" data-iml="'))[0];
    
    const [image, nameFirst] = getFilterred(_dom.split('<div class="zs7s8d jxFHg">'));
    obj.name = getFilterred(nameFirst.split('</div>'))[0];
    
    const [imageAndName, ...textFirst] = _dom.split('<span><span class="CNusmb">');
    obj.text = textFirst.join('').replace(/<[^>]*>?/gm, '');
    
    obj.timestamp = String(new Date());
    return obj;
}

const prototype = {
    img: '',
    name: '',
    text: '',
    timestamp: 0
};
class Transcript {
    transcripts = [prototype];
    isNew = false;

    constructor() {
        this.transcripts = [];
    }

    get lastIndex() {
        return this.transcripts.length - 1;
    }
    get last() {
        return this.transcripts[this.lastIndex]
    }

    addNew = (obj) => this.transcripts.push(obj);

    replaceWithNew = (obj) => this.transcripts[this.lastIndex] = obj;

    setObj = (obj = prototype) => {
        if (!this.last || this.isNew) this.addNew(obj);
        else if (this.last.img === obj.img) this.replaceWithNew(obj);
        else this.addNew(obj);
    }

    afterOneSecon = (dom) => {
        const arrOfDivs = getFilterred(dom.split('<div class="TBMuR bj4p3b" style="">'));
        arrOfDivs.forEach(obj => this.setObj(info(obj)));
        this.isNew = arrOfDivs.length === 0;
    }

}

const domChanged = () => {

    let transcript = new Transcript();

    setInterval(async () => {
        const dom = await tab.findElement(swd.By.css(".a4cQT")).getAttribute('innerHTML');
        transcript.afterOneSecon(dom);

        console.log(transcript.transcripts)
        if (transcript.transcripts.length > 10) {
            console.log('Final Transcript', transcript.transcripts);
            tab.close();
        }
    }, 1000)

    // console.log('Dom Changed event registered.');

    // let elementToObserve = window.document.getElementById('dom');
    // // create a new instance of `MutationObserver` named `observer`, 
    // // passing it a callback function
    // const observer = new MutationObserver(function (mutationsList, observer) {
    //     console.log(mutationsList);
    // });
    // // call `observe` on that MutationObserver instance, 
    // // passing it the element to observe, and the options object
    // observer.observe(elementToObserve, { characterData: false, childList: true, attributes: false });
}