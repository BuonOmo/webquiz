webdriver = require 'selenium-webdriver'
chai      = require 'chai'
expect    = chai.expect
chai.use require 'chai-as-promised'

baseUrl = 'http://localhost:3000/'

before ->
  @timeout 15000 # browser launching
  @driver = new webdriver.Builder()
      .forBrowser 'chrome'
      .build()
  @driver.get baseUrl

after ->
  @driver.quit()


describe "Basic navigation", ->
  @timeout 7000
  it 'should navigate to the instructions', ->
    @driver.findElement(css: 'ul>.navbar-button:nth-of-type(3)>a').click()
    expect(@driver.getTitle()).to.eventually.equal 'Web quiz | instructions'
    expect(@driver.getCurrentUrl()).to.eventually.equal baseUrl + 'instructions/'
  it 'should navigate to the dashboard', ->
    @driver.findElement(css:'ul > li.navbar-button:nth-of-type(2) > a').click()
    expect(@driver.getTitle()).to.eventually.equal 'Web quiz | tableau de bord'
    expect(@driver.getCurrentUrl()).to.eventually.equal baseUrl + 'dashboard/'
  it 'should navigate to quicktest', ->
    @driver.findElement(linkText:'Test').click()
    expect(@driver.getTitle()).to.eventually.equal 'Web quiz | Test rapide'
    expect(@driver.getCurrentUrl()).to.eventually.equal baseUrl + 'test/'
