var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('phantomjs')
    .build();

driver.get('http://localhost:3000/');

// Go to dashboard
driver.findElement(By.css('ul > li:nth-of-type(2) > a')).click();
driver.wait(until.titleIs('Web quiz | tableau de bord'), 1000);



driver.quit();
