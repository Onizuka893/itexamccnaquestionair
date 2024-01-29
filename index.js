
const axios = require("axios"); 
const cheerio = require("cheerio"); 
const fs = require("fs"); 
 
const fetchTitles = async () => { 
	try { 

		const response = await axios.get("https://itexamanswers.net/ccna-1-v7-0-final-exam-answers-full-introduction-to-networks.html"); 
 
		const html = response.data; 
		//const html = '<p><strong>1. During a routine inspection, a technician discovered that software that was installed on a computer was secretly collecting data about websites that were visited by users of the computer. Which type of threat is affecting this computer?</strong></p><ul><li>DoS attack​</li><li>identity theft</li><li><span style="color: rgb(255, 0, 0); --darkreader-inline-color: #ff1a1a;" data-darkreader-inline-color=""><strong>spyware</strong></span></li><li>zero-day attack</li></ul><p><strong>2. Which term refers to a network that provides secure access to the corporate offices by suppliers, customers and collaborators?</strong></p><ul><li>Internet</li><li>intranet</li><li><span style="color: rgb(255, 0, 0); --darkreader-inline-color: #ff1a1a;" data-darkreader-inline-color=""><strong>extranet</strong></span></li><li>extendednet</li></ul><p><strong>3. A large corporation has modified its network to allow users to access network resources from their personal laptops and smart phones. Which networking trend does this describe?</strong></p><ul><li>cloud computing</li><li>online collaboration</li><li><span style="color: rgb(255, 0, 0); --darkreader-inline-color: #ff1a1a;" data-darkreader-inline-color=""><strong>bring your own device</strong></span></li><li>video conferencing</li></ul>'; 
		const $ = cheerio.load(html); 

    const questionsAndAnswers = [];

    $('p strong').each((index, questionElement) => {
      const questionText = $(questionElement).text().trim();

      const answers = [];

      // Select the ul element following the current question
      const ulElement = $(questionElement).closest('p').next('ul');

      // Select each li element within the ul (answers)
      ulElement.find('li').each((k, li) => {
        const answerText = $(li).text().trim();
        const isCorrect = $(li).find('strong').length > 0; // Check if strong element exists

        answers.push({
          text: answerText,
          isCorrect: isCorrect,
        });
      });

      // Push the question and answers to the array
      if(answers.length > 0) {
        questionsAndAnswers.push({
          question: questionText,
          answers: answers,
        });
      }
    });


    return questionsAndAnswers;
	} catch (error) { 
		throw error; 
	} 
}; 
 
fetchTitles().then(titles => JSON.stringify(titles)).then(json => fs.writeFileSync("final.json", json)); 
