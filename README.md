# Hudl automation testing project

# Variables

- In order to use these tests you must go to the top of the file named login.test.js and fill in your credentials inside the speech marks for emailAddress and password.

# Setup

1. Please install npm, jest, and selenium webdriver in order to run the tests. (If you are unsure how to do so, see intructions below)
2. Use your terminal to navigate to the directory that this project is located in.
3. Run the command "npm test" in order to run all the tests in this project.

# Install npm

npm install -g npm
(Type npm -v into your terminal to check it has successfully installed)

# Intall jest

npm install --save-dev jest

# Intall selenium

npm install selenium-webdriver

# Setting up chrome webdriver

1. Visit https://chromedriver.chromium.org/downloads and download driver relevant to your version of chrome and machine.
2. Now, go to your downloads folder, find the chromedriver_mac64.zip/chromedriver_win32.zip file and unpack it. You will see the chromedriver executable file.

# Mac

3. Run mv chromedriver /usr/local/bin to move file to correct location
4. Chromedriver will most likely be blocked from opening, you must enter this in your terminal to lift the quarantine xattr -d com.apple.quarantine /usr/local/bin/chromedriver

# Windows

3. Right-click on My Computer and click on Properties
4. Click on the Change settings option and then click on the Advanced tab
5. Now select the Environmental variables from the Advanced tab
6. Now, from the available options under system variables, select the Path option and click on Edit
7. At the end of the string, enter a semicolon ‘;’ and paste the path of your ChromeDriver file that you copied earlier, and click OK
   Note: You may need to give chromedriver permission as your firewall may block it.

# Notes:

- Noticed if you are logged out an go to https://www.hudl.com/home it will show the logged out screen and change the url (therefore checking url when logging in is valid way to check successful login.)
- Test is skipped because it looks like theres a bug on your site, when I click remember me it remembers me but when it is unticked it still remembers me.
