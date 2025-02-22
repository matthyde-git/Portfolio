const searchQuery = document.getElementById("query");
const submit = document.getElementById("submit");
const message = document.getElementById("message");
const results = document.getElementById("results-box");

const result1 = document.getElementById("result-1");
const title1 = document.getElementById("title-1");
const link1 = document.getElementById("link-1");
const desc1 = document.getElementById("desc-1");
const date1 = document.getElementById("date-1");
const score1 = document.getElementById("score-1");

const result2 = document.getElementById("result-2");
const title2 = document.getElementById("title-2");
const link2 = document.getElementById("link-2");
const desc2 = document.getElementById("desc-2");
const date2 = document.getElementById("date-2");
const score2 = document.getElementById("score-2");

const result3 = document.getElementById("result-3");
const title3 = document.getElementById("title-3");
const link3 = document.getElementById("link-3");
const desc3 = document.getElementById("desc-3");
const date3 = document.getElementById("date-3");
const score3 = document.getElementById("score-3");

const result4 = document.getElementById("result-4");
const title4 = document.getElementById("title-4");
const link4 = document.getElementById("link-4");
const desc4 = document.getElementById("desc-4");
const date4 = document.getElementById("date-4");
const score4 = document.getElementById("score-4");

const result5 = document.getElementById("result-5");
const title5 = document.getElementById("title-5");
const link5 = document.getElementById("link-5");
const desc5 = document.getElementById("desc-5");
const date5 = document.getElementById("date-5");
const score5 = document.getElementById("score-5");

var jsonData;

const dataArray = [];

async function getData()
/*
    fetches the JSON data, formats it into an array of strings to be passed to the model, cleans the data by removing the null values
*/
{
    try 
    {
        const response = await fetch("/data");

        if (!response.ok) 
        {
            throw new Error(`Response status: ${response.status}`);
        }
  
        jsonData = await response.json();

        for (let i = 0; i < jsonData.length; i++)
        {
            var string = jsonData[i].title;

            // filters out the null values

            if (jsonData[i].link !== null) { string = string + ", " + jsonData[i].link; }
            if (jsonData[i].keywords !== null) { string = string + ", " + jsonData[i].keywords; }
            if (jsonData[i].creator !== null) { string = string + ", " + jsonData[i].creator; }
            if (jsonData[i].video_url !== null) { string = string + ", " + jsonData[i].video_url; }
            if (jsonData[i].description !== null) { string = string + ", " + jsonData[i].description; }
            if (jsonData[i].content !== null) { string = string + ", " + jsonData[i].content; }
            if (jsonData[i].pubDate !== null) { string = string + ", " + jsonData[i].pubDate; }
            if (jsonData[i].full_description !== null) { string = string + ", " + jsonData[i].full_description; }
            if (jsonData[i].image_url !== null) { string = string + ", " + jsonData[i].image_url; }
            if (jsonData[i].source_id !== null) { string = string + ", " + jsonData[i].source_id; }

            dataArray.push(string);
        }
    } 
    catch (error) 
    {
        console.error(error.message);
    }
}

getData();

function getTopFiveScores(array)
/*
    returns a 2d array containing the 5 highest scores and their indexes in the data array
*/
{
    var temp = [];
    var top5 = [];

    // creates a copy of the array with each score and index
    for (let i = 0; i < array.length; i++)
    {
        temp.push([array[i], i]);
    }

    // sorts the temp array by it's score
    temp = temp.sort((a, b) => a[0] - b[0]);

    // reverses the array so that it is in descending order
    temp = temp.reverse();

    // 2d array with the scores and indexes of the top 5 highest scoring results
    top5 = [temp[0], temp[1], temp[2], temp[3], temp[4]];

    return top5;
}

function search(query, data) 
/*
    loads the universal sentance encoder, creates objects with the user query and 100 records from the data, embeds them and calculates their scores

    then calls the getTopFiveScores method and loads the relevant JSON values into the HTML elements
*/
{
    use.loadQnA().then(model => {

        // slicing the data into chunks
        const chunk1 = { queries: query, responses: data.slice(0, 100) };
        const chunk2 = { queries: query, responses: data.slice(100, 200) };
        const chunk3 = { queries: query, responses: data.slice(200, 300) };
        const chunk4 = { queries: query, responses: data.slice(300, 400) };
        const chunk5 = { queries: query, responses: data.slice(400, 500) };
        const chunk6 = { queries: query, responses: data.slice(500, 600) };
        const chunk7 = { queries: query, responses: data.slice(600, 700) };
        const chunk8 = { queries: query, responses: data.slice(700, 800) };
        const chunk9 = { queries: query, responses: data.slice(800, 900) };
        const chunk10 = { queries: query, responses: data.slice(900, 1000) };
        const chunk11 = { queries: query, responses: data.slice(1000, 1100) };
        const chunk12 = { queries: query, responses: data.slice(1100, 1200) };
        const chunk13 = { queries: query, responses: data.slice(1200, 1300) };
        const chunk14 = { queries: query, responses: data.slice(1300, 1400) };
        const chunk15 = { queries: query, responses: data.slice(1400, 1500) };
        const chunk16 = { queries: query, responses: data.slice(1500, 1600) };
        const chunk17 = { queries: query, responses: data.slice(1600, 1700) };
        const chunk18 = { queries: query, responses: data.slice(1700, 1800) };
        const chunk19 = { queries: query, responses: data.slice(1800, 1900) };
        const chunk20 = { queries: query, responses: data.slice(1900, 2000) };
        const chunk21 = { queries: query, responses: data.slice(2000, 2100) };
        const chunk22 = { queries: query, responses: data.slice(2100, 2200) };
        const chunk23 = { queries: query, responses: data.slice(2200, 2300) };
        const chunk24 = { queries: query, responses: data.slice(2300, 2400) };
        const chunk25 = { queries: query, responses: data.slice(2400) };

        // creating embeddings of the chunks individually to save memory
        const embeddings1 = model.embed(chunk1);
        const embeddings2 = model.embed(chunk2);
        const embeddings3 = model.embed(chunk3);
        const embeddings4 = model.embed(chunk4);
        const embeddings5 = model.embed(chunk5);
        const embeddings6 = model.embed(chunk6);
        const embeddings7 = model.embed(chunk7);
        const embeddings8 = model.embed(chunk8);
        const embeddings9 = model.embed(chunk9);
        const embeddings10 = model.embed(chunk10);
        const embeddings11 = model.embed(chunk11);
        const embeddings12 = model.embed(chunk12);
        const embeddings13 = model.embed(chunk13);
        const embeddings14 = model.embed(chunk14);
        const embeddings15 = model.embed(chunk15);
        const embeddings16 = model.embed(chunk16);
        const embeddings17 = model.embed(chunk17);
        const embeddings18 = model.embed(chunk18);
        const embeddings19 = model.embed(chunk19);
        const embeddings20 = model.embed(chunk20);
        const embeddings21 = model.embed(chunk21);
        const embeddings22 = model.embed(chunk22);
        const embeddings23 = model.embed(chunk23);
        const embeddings24 = model.embed(chunk24);
        const embeddings25 = model.embed(chunk25);

        // calculating the scores of the embeddings
        var scores1 = tf.matMul(embeddings1['queryEmbedding'], embeddings1['responseEmbedding'], false, true).arraySync();
        var scores2 = tf.matMul(embeddings2['queryEmbedding'], embeddings2['responseEmbedding'], false, true).arraySync();
        var scores3 = tf.matMul(embeddings3['queryEmbedding'], embeddings3['responseEmbedding'], false, true).arraySync();
        var scores4 = tf.matMul(embeddings4['queryEmbedding'], embeddings4['responseEmbedding'], false, true).arraySync();
        var scores5 = tf.matMul(embeddings5['queryEmbedding'], embeddings5['responseEmbedding'], false, true).arraySync();
        var scores6 = tf.matMul(embeddings6['queryEmbedding'], embeddings6['responseEmbedding'], false, true).arraySync();
        var scores7 = tf.matMul(embeddings7['queryEmbedding'], embeddings7['responseEmbedding'], false, true).arraySync();
        var scores8 = tf.matMul(embeddings8['queryEmbedding'], embeddings8['responseEmbedding'], false, true).arraySync();
        var scores9 = tf.matMul(embeddings9['queryEmbedding'], embeddings9['responseEmbedding'], false, true).arraySync();
        var scores10 = tf.matMul(embeddings10['queryEmbedding'], embeddings10['responseEmbedding'], false, true).arraySync();
        var scores11= tf.matMul(embeddings11['queryEmbedding'], embeddings11['responseEmbedding'], false, true).arraySync();
        var scores12 = tf.matMul(embeddings12['queryEmbedding'], embeddings12['responseEmbedding'], false, true).arraySync();
        var scores13 = tf.matMul(embeddings13['queryEmbedding'], embeddings13['responseEmbedding'], false, true).arraySync();
        var scores14 = tf.matMul(embeddings14['queryEmbedding'], embeddings14['responseEmbedding'], false, true).arraySync();
        var scores15 = tf.matMul(embeddings15['queryEmbedding'], embeddings15['responseEmbedding'], false, true).arraySync();
        var scores16 = tf.matMul(embeddings16['queryEmbedding'], embeddings16['responseEmbedding'], false, true).arraySync();
        var scores17 = tf.matMul(embeddings17['queryEmbedding'], embeddings17['responseEmbedding'], false, true).arraySync();
        var scores18 = tf.matMul(embeddings18['queryEmbedding'], embeddings18['responseEmbedding'], false, true).arraySync();
        var scores19 = tf.matMul(embeddings19['queryEmbedding'], embeddings19['responseEmbedding'], false, true).arraySync();
        var scores20 = tf.matMul(embeddings20['queryEmbedding'], embeddings20['responseEmbedding'], false, true).arraySync();
        var scores21 = tf.matMul(embeddings21['queryEmbedding'], embeddings21['responseEmbedding'], false, true).arraySync();
        var scores22 = tf.matMul(embeddings22['queryEmbedding'], embeddings22['responseEmbedding'], false, true).arraySync();
        var scores23 = tf.matMul(embeddings23['queryEmbedding'], embeddings23['responseEmbedding'], false, true).arraySync();
        var scores24 = tf.matMul(embeddings24['queryEmbedding'], embeddings24['responseEmbedding'], false, true).arraySync();
        var scores25 = tf.matMul(embeddings25['queryEmbedding'], embeddings25['responseEmbedding'], false, true).arraySync();


        // concatenating all the scores into a single array
        var overallScores = scores1[0].concat(scores2[0], scores3[0], scores4[0], scores5[0], scores6[0],
                                              scores7[0], scores8[0], scores9[0], scores10[0], scores11[0],
                                              scores12[0], scores13[0], scores14[0], scores15[0], scores16[0],
                                              scores17[0], scores18[0], scores19[0], scores20[0], scores21[0],
                                              scores22[0], scores23[0], scores24[0], scores25[0]
        );

        const topFiveResults = getTopFiveScores(overallScores);

        // displays the current search in a new colour
        message.classList.replace("loading", "current-search");
        message.innerText = "Current search: " + searchQuery.value;

        // values for the first result
        title1.innerText = jsonData[topFiveResults[0][1]].title;
        link1.innerHTML = `<a href=${jsonData[topFiveResults[0][1]].link}>Click here to view the article</a>`;

        // checks that the article has a description
        if (jsonData[topFiveResults[0][1]].description !== null)
        {
            desc1.innerText = "Description: " + jsonData[topFiveResults[0][1]].description;
        }
        else
        {
            desc1.innerText = "Description: No description";
        }
        
        date1.innerText = "Publication date: " + jsonData[topFiveResults[0][1]].pubDate;
        score1.innerText = "USE QnA Score: " + topFiveResults[0][0];
        result1.classList.remove("hidden");

        // values for the second result
        title2.innerText = jsonData[topFiveResults[1][1]].title;
        link2.innerHTML = `<a href=${jsonData[topFiveResults[1][1]].link}>Click here to view the article</a>`;

        if (jsonData[topFiveResults[1][1]].description !== null)
        {
            desc2.innerText = "Description: " + jsonData[topFiveResults[1][1]].description;
        }
        else
        {
            desc2.innerText = "Description: No description";
        }

        date2.innerText = "Publication date: " + jsonData[topFiveResults[1][1]].pubDate;
        score2.innerText = "USE QnA Score: " + topFiveResults[1][0];
        result2.classList.remove("hidden");

        // values for the third result
        title3.innerText = jsonData[topFiveResults[2][1]].title;
        link3.innerHTML = `<a href=${jsonData[topFiveResults[2][1]].link}>Click here to view the article</a>`;

        if (jsonData[topFiveResults[2][1]].description !== null)
        {
            desc3.innerText = "Description: " + jsonData[topFiveResults[2][1]].description;
        }
        else
        {
            desc3.innerText = "Description: No description";
        }

        
        date3.innerText = "Publication date: " + jsonData[topFiveResults[2][1]].pubDate;
        score3.innerText = "USE QnA Score: " + topFiveResults[2][0];
        result3.classList.remove("hidden");

        // values for the fourth result
        title4.innerText = jsonData[topFiveResults[3][1]].title;
        link4.innerHTML = `<a href=${jsonData[topFiveResults[3][1]].link}>Click here to view the article</a>`;

        if (jsonData[topFiveResults[3][1]].description !== null)
        {
            desc4.innerText = "Description: " + jsonData[topFiveResults[3][1]].description;
        }
        else
        {
            desc4.innerText = "Description: No description";
        }
        
        date4.innerText = "Publication date: " + jsonData[topFiveResults[3][1]].pubDate;
        score4.innerText = "USE QnA Score: " + topFiveResults[3][0];
        result4.classList.remove("hidden");

        // values for the fifth result
        title5.innerText = jsonData[topFiveResults[4][1]].title;
        link5.innerHTML = `<a href=${jsonData[topFiveResults[4][1]].link}>Click here to view the article</a>`;

        if (jsonData[topFiveResults[4][1]].description !== null)
        {
            desc5.innerText = "Description: " + jsonData[topFiveResults[4][1]].description;
        }
        else
        {
            desc5.innerText = "Description: No description";
        }

        date5.innerText = "Publication date: " + jsonData[topFiveResults[4][1]].pubDate;
        score5.innerText = "USE QnA Score: " + topFiveResults[4][0];
        result5.classList.remove("hidden");
    });
}

function handleSubmit() 
{
    if (searchQuery.value === "")
        // prevents the user from searching an empty string
    {
        message.classList.remove("current-search");
        message.classList.remove("loading");
        message.classList.add("error");

        message.innerText = "Query cannot be empty";
    }
    else
    {
        // tempory value whilst the function is executed
        message.classList.remove("current-search");
        message.classList.remove("error");
        message.classList.add("loading");

        message.innerText = "Loading...";

        // creates an array to be passed to the search function
        const queryArray = JSON.parse("[" + "\"" + searchQuery.value + "\"" + "]");

        search(queryArray, dataArray);
    }
}

submit.addEventListener("click", handleSubmit);