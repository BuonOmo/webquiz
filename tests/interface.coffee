webdriver     = require 'selenium-webdriver'
chai          = require 'chai'
chaiWebdriver = require 'chai-webdriver'
expect    = chai.expect
chai.use require 'chai-as-promised'
baseUrl = 'http://localhost:3000/'

before ->
  @timeout 15000 # browser launching
  @driver = new webdriver.Builder()
      # change 'phantomjs' to 'chrome' on your computer for visual tests
      .forBrowser 'chrome'
      .build()
  chai.use chaiWebdriver(@driver)
  @driver.get baseUrl

after ->
  @driver.quit()

describe "Interface", ->
  beforeEach ->
    @driver.get "#{baseUrl}dashboard/"

  describe "Basic navigation", ->
    @timeout 7000
    it "navigate to the instructions", ->
      @driver.findElement(css: "ul>.navbar-button:nth-of-type(3)>a").click()
      expect(@driver.getTitle()).to.eventually.equal "Web quiz | instructions"
      expect(@driver.getCurrentUrl()).to.eventually.equal "#{baseUrl}instructions/"
    it "navigate to the dashboard", ->
      @driver.findElement(css:"ul > li.navbar-button:nth-of-type(2) > a").click()
      expect(@driver.getTitle()).to.eventually.equal "Web quiz | tableau de bord"
      expect(@driver.getCurrentUrl()).to.eventually.equal "#{baseUrl}dashboard/"
    it "navigate to quicktest", ->
      @driver.findElement(linkText:"Test").click()
      expect(@driver.getTitle()).to.eventually.equal "Web quiz | Test rapide"
      expect(@driver.getCurrentUrl()).to.eventually.equal "#{baseUrl}test/"

  describe "Full exam", ->
    @timeout 6000
    it "has a closed modal", ->
      expect("#modal-exam").dom.to.have.style "opacity", "0"
    it "opens the exam modal", ->
      @driver.findElement(linkText: "Exam").click()
      expect(@driver.getCurrentUrl()).to.eventually.equal "#{baseUrl}dashboard/#modal-exam"
      expect("#modal-exam").dom.to.be.visible()
    it "select CSS3 and submit form", (done)->
      domains = @driver.findElement(css: "[name=domains] > option:nth-of-type(2)")
      domains.click()
      domains.submit()
      expect(@driver.getCurrentUrl()).to.eventually.equal("#{baseUrl}exam").then ->
        setTimeout ->
          expect("#domain").dom.to.contain.text "CSS3"
          expect("h1").dom.to.contain.text "Examen"
          done()
        , 1400
    it "tries to go to the next page", ->
      setTimeout ->
        @driver.findElement(css: "#next-question").click()
        expect('#droptarget').dom.to.have.class "blink"
      , 500
    it "drag and drop ten times", ->
      setTimeout ->
        @driver.dragAndDrop(css: "#answers > div:nth-of-type(3)", css: "#droptarget")
        @driver.findElement(css: "#next-question").click()
        @driver.dragAndDrop(css: "#answers > div:nth-of-type(3)", css: "#droptarget")
        @driver.findElement(css: "#next-question").click()
        @driver.dragAndDrop(css: "#answers > div:nth-of-type(3)", css: "#droptarget")
        @driver.findElement(css: "#next-question").click()
        @driver.dragAndDrop(css: "#answers > div:nth-of-type(3)", css: "#droptarget")
        @driver.findElement(css: "#next-question").click()
        @driver.dragAndDrop(css: "#answers > div:nth-of-type(3)", css: "#droptarget")
        @driver.findElement(css: "#next-question").click()
        @driver.dragAndDrop(css: "#answers > div:nth-of-type(3)", css: "#droptarget")
        @driver.findElement(css: "#next-question").click()
        @driver.dragAndDrop(css: "#answers > div:nth-of-type(3)", css: "#droptarget")
        @driver.findElement(css: "#next-question").click()
        @driver.dragAndDrop(css: "#answers > div:nth-of-type(3)", css: "#droptarget")
        @driver.findElement(css: "#next-question").click()
        @driver.dragAndDrop(css: "#answers > div:nth-of-type(3)", css: "#droptarget")
        @driver.findElement(css: "#next-question").click()
      , 700

###
describe "theme", ->
  @timeout 15000
  it 'should do stuff', ->
    @driver.find... # http://seleniumhq.github.io/selenium/docs/api/javascript/index.html
    expect(@driver.get...).to.eventually.equal( something )
###
