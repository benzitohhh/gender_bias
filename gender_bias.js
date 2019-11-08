//const maleWords = ["excellen\\w*", "superb", "outstanding", "unique", "exceptional", "unparalleled", "\\w{2,}est(\W|$)", "best", "most", "wonderful", "terrific\\w*", "fabulous", "magnificent", "remarkable", "extraordinar\\w*", "amazing", "supreme\\w*", "unmatched", "talent\\w*", "intell\\w*", "smart\\w*", "skill\\w*", "ability", "genius", "brilliant\\w*", "bright\\w*", "brain\\w*", "aptitude", "gift\\w*", "capacity", "propensity", "innate", "flair", "knack", "clever\\w*", "expert\\w*", "proficient\\w*", "capable", "adept\\w*", "able", "competent", "natural\\w*", "inherent\\w*", "instinct\\w*", "adroit\\w*", "creative\\w*", "insight\\w*", "analytical", "research\\w*", "data", "study", "studies", "experiment\\w*", "scholarship", "result\\w*", "^test\\w*", "finding\\w*", "publication\\w*", "publish\\w*", "vita\\w*", "method\\w*", "scien\\w*", "grant\\w*", "fund\\w*", "manuscript\\w*", "project\\w*", "journal\\w*", "theor\\w*", "discover\\w*", "contribution\\w*"];
//const femaleWords = ["hardworking", "conscientious", "depend\\w*", "meticulous", "thorough", "diligen\\w*", "dedicate", "careful", "reliab\\w*", "effort\\w*", "assiduous", "trust\\w*", "responsib\\w*", "methodical", "industrious", "busy", "work\\w*", "persist\\w*", "organiz\\w*", "disciplined", "teach", "instruct", "educat\\w*", "train\\w*", "mentor", "supervis\\w*", "adviser", "counselor", "syllabus", "syllabus", "course\\w*", "class", "service", "colleague", "citizen", "communicate\\w*", "lectur\\w*", "student\\w*", "present\\w*", "rapport"];

const maleWords = [
  'active\\w*',
  'adventurous\\w*',
  'aggress\\w*',
  'ambitio\\w*',
  'analy\\w*',
  'assert\\w*',
  'athlet\\w*',
  'autonom\\w*',
  'battle\\w*',
  'boast\\w*',
  'challeng\\w*',
  'champion\\w*',
  'compet\\w*',
  'confident\\w*',
  'courag\\w*',
  'decid\\w*',
  'decision\\w*',
  'decisive\\w*',
  'defend\\w*',
  'determin\\w*',
  'domina\\w*',
  'dominant\\w*',
  'driven\\w*',
  'fearless\\w*',
  'fight\\w*',
  'force\\w*',
  'greedy\\w*',
  'head-strong\\w*',
  'headstrong\\w*',
  'hierarch\\w*',
  'hostil\\w*',
  'impulsive\\w*',
  'independen\\w*',
  'individual\\w*',
  'intellect\\w*',
  'lead\\w*',
  'logic\\w*',
  'objective\\w*',
  'opinion\\w*',
  'outspoken\\w*',
  'persist\\w*',
  'principle\\w*',
  'reckless\\w*',
  'self-confiden\\w*',
  'self-relian\\w*',
  'self-sufficien\\w*',
  'selfconfiden\\w*',
  'selfrelian\\w*',
  'selfsufficien\\w*',
  'stubborn\\w*',
  'superior\\w*',
  'unreasonab\\w*'
]

const femaleWords = [
  'agree\\w*',
  'affectionate\\w*',
  'child\\w*',
  'cheer\\w*',
  'collab\\w*',
  'commit\\w*',
  'communal\\w*',
  'compassion\\w*',
  'connect\\w*',
  'considerate\\w*',
  'cooperat\\w*',
  'co-operat\\w*',
  'depend\\w*',
  'emotiona\\w*',
  'empath\\w*',
  'feel\\w*',
  'flatterable\\w*',
  'gentle\\w*',
  'honest\\w*',
  'interpersonal\\w*',
  'interdependen\\w*',
  'interpersona\\w*',
  'inter-personal\\w*',
  'inter-dependen\\w*',
  'inter-persona\\w*',
  'kind\\w*',
  'kinship\\w*',
  'loyal\\w*',
  'modesty\\w*',
  'nag\\w*',
  'nurtur\\w*',
  'pleasant\\w*',
  'polite\\w*',
  'quiet\\w*',
  'respon\\w*',
  'sensitiv\\w*',
  'submissive\\w*',
  'support\\w*',
  'sympath\\w*',
  'tender\\w*',
  'together\\w*',
  'trust\\w*',
  'understand\\w*',
  'warm\\w*',
  'whin\\w*',
  'enthusias\\w*',
  'inclusive\\w*',
  'yield\\w*',
  'share\\w*',
  'sharin\\w*',
]

function scoreIt(a,b) {
  if (!a && !b) {
     return 0
  }

  return (100 * (a - b) / (a + b)).toFixed()
}

function analyze(input) {
  var splitLetterText = input.split(" ")
  var score = { 'male': 0, 'female' : 0 }
  var words = { 'male': {}, 'female': {} }

  for (var i = 0; i < splitLetterText.length; i++) {
    let letterWord = splitLetterText[i];
    letterWord = letterWord.replace(/\.$/g,'');
    for (var maleCounter = 0; maleCounter < maleWords.length; maleCounter++) {
      if(letterWord.toLowerCase().search(maleWords[maleCounter]) == 0) {
        if(!words.male[letterWord]) {
          words.male[letterWord] = 0;
        }
        words.male[letterWord]++;
        score.male++;
      }
    }
    for (var femaleCounter = 0; femaleCounter < femaleWords.length; femaleCounter++) {
      if(letterWord.toLowerCase().search(femaleWords[femaleCounter]) == 0) {
        if(!words.female[letterWord]) {
          words.female[letterWord] = 0;
        }
        words.female[letterWord]++;
        score.female++;
      }
    }
  }

  const { male, female } = score

  const male_score = scoreIt(male, female)
  const female_score = scoreIt(female, male)

  return {
    words,
    counts: score,
    score: {
      male_score,
      female_score,
      is_neutral:   male == female,
      is_male_bias: male_score > female_score,
      is_female_bias: female_score > male_score
    },
  }
}

// Twitter stuff
// TODO: add here
// can generate from https://developer.twitter.com/en/apps - click an app, then click 'keys and tokens'
const CONSUMER_KEY        = 'xxx'
const CONSUMER_SECRET     = 'xxx'
const ACCESS_TOKEN        = 'xxx'
const ACCESS_TOKEN_SECRET = 'xxx'

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key:        CONSUMER_KEY,
  consumer_secret:     CONSUMER_SECRET,
  access_token_key:    ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET
});

const SCREEN_NAME = 'FinancialTimes'

var params = {
  screen_name: SCREEN_NAME,
  count: 200, // max is 200
  tweet_mode: "extended"
}

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    const inputs = tweets.map(tweet => tweet.full_text)
    const score_objs = inputs.map(analyze)

    const summary = score_objs.reduce((acc, score_obj) => {

      const { score, counts, words } = score_obj
      const { male: male_counts, female: female_counts } = counts
      const { male: male_words, female: female_words } = words
      const { male_score, female_score, is_neutral, is_male_bias, is_female_bias } = score

      if (is_male_bias) {
        acc.num_male_bias_tweets++
      }
      if (is_female_bias) {
        acc.num_female_bias_tweets++
      }
      if (is_neutral) {
        acc.num_neutral_tweets++
      }
      acc.num_all_tweets++

      Object.keys(male_words).forEach(word => {
        const current = acc.all_male_words[word] || 0
        acc.all_male_words[word] = current + 1
      })
      Object.keys(female_words).forEach(word => {
        const current = acc.all_female_words[word] || 0
        acc.all_female_words[word] = current + 1
      })

      acc.total_male_words += male_counts
      acc.total_female_words += female_counts

      return acc
    }, {
      num_male_bias_tweets: 0,
      num_female_bias_tweets: 0,
      num_neutral_tweets: 0,
      num_all_tweets: 0,

      all_male_words: {},
      all_female_words: {},

      total_female_words: 0,
      total_male_words: 0
    })

    const { total_male_words, total_female_words } = summary
    const combined_male_score = scoreIt(total_male_words, total_female_words)
    const combined_female_score = scoreIt(total_female_words, total_male_words)

    console.log(JSON.stringify(score_objs, null, 2))
    console.log(summary)
    console.log({
      combined_male_score,
      combined_female_score
    })

    inputs.forEach(input => {
      console.log(input)
    })
  }
});
