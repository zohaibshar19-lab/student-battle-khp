/* =========================================================
   STUDENT BATTLE KHP
   COMPLETE SCRIPT.JS
========================================================= */


/* =========================================================
   STUDENT DATA
========================================================= */

/* =========================================================
   SUPABASE
   Student/profile/battle data is stored in Supabase.
   Student/profile data is stored in Supabase only.
========================================================= */

const SUPABASE_URL = "https://pndxiccvlmrnfhdefndr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_vmd57FS2ifya67M1egLOfw_a2lDnyJa";

let supabaseClient = null;
let supabaseReady = false;

try {
    if (window.supabase && typeof window.supabase.createClient === "function") {
        supabaseClient = window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY,
            {
                auth: {
                    persistSession: true,
                    autoRefreshToken: true,
                    detectSessionInUrl: true
                }
            }
        );
        supabaseReady = true;
    }
} catch (error) {
    console.error("Supabase initialization failed:", error);
}

function requireSupabase(message = "The online service is unavailable right now. Please try again in a moment.") {
    if (supabaseReady && supabaseClient) return true;
    console.error(message);
    alert(message);
    return false;
}

let currentStudent = null;


/* =========================================================
   QUIZ STATE
========================================================= */

let currentCategory = "";
let currentQuestion = 0;
let currentScore = 0;
let battleQuestions = [];
let answerLocked = false;


/* =========================================================
   QUESTION DATABASE
   50 QUESTIONS PER CATEGORY
========================================================= */

const questionBank = {

    "General Knowledge": [

        {
            q: "What is the capital of Pakistan?",
            options: ["Karachi", "Islamabad", "Lahore", "Peshawar"],
            answer: 1
        },

        {
            q: "Which is the largest ocean in the world?",
            options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
            answer: 2
        },

        {
            q: "How many continents are there?",
            options: ["5", "6", "7", "8"],
            answer: 2
        },

        {
            q: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Mercury"],
            answer: 1
        },

        {
            q: "What is the largest planet in our solar system?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: 2
        },

        {
            q: "Which country is famous for the Great Wall?",
            options: ["Japan", "China", "India", "Korea"],
            answer: 1
        },

        {
            q: "What is the currency of Japan?",
            options: ["Yuan", "Won", "Yen", "Ringgit"],
            answer: 2
        },

        {
            q: "Which is the smallest continent?",
            options: ["Europe", "Australia", "Africa", "South America"],
            answer: 1
        },

        {
            q: "How many days are there in a leap year?",
            options: ["364", "365", "366", "367"],
            answer: 2
        },

        {
            q: "Which animal is known as the King of the Jungle?",
            options: ["Tiger", "Lion", "Elephant", "Leopard"],
            answer: 1
        },

        {
            q: "Which is the fastest land animal?",
            options: ["Lion", "Horse", "Cheetah", "Tiger"],
            answer: 2
        },

        {
            q: "Which gas do humans need for respiration?",
            options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
            answer: 1
        },

        {
            q: "How many sides does a triangle have?",
            options: ["2", "3", "4", "5"],
            answer: 1
        },

        {
            q: "Which is the largest mammal?",
            options: ["Elephant", "Blue whale", "Giraffe", "Shark"],
            answer: 1
        },

        {
            q: "Which language has the most native speakers?",
            options: ["English", "Spanish", "Mandarin Chinese", "Arabic"],
            answer: 2
        },

        {
            q: "Which country gifted the Statue of Liberty to the USA?",
            options: ["Germany", "France", "Italy", "Spain"],
            answer: 1
        },

        {
            q: "Which instrument is used to measure temperature?",
            options: ["Barometer", "Thermometer", "Hygrometer", "Compass"],
            answer: 1
        },

        {
            q: "How many colors are traditionally in a rainbow?",
            options: ["5", "6", "7", "8"],
            answer: 2
        },

        {
            q: "Which organ pumps blood through the human body?",
            options: ["Brain", "Liver", "Heart", "Lung"],
            answer: 2
        },

        {
            q: "Which metal is liquid at room temperature?",
            options: ["Iron", "Mercury", "Copper", "Gold"],
            answer: 1
        },

        {
            q: "Which country has the city of Dubai?",
            options: ["Saudi Arabia", "Qatar", "UAE", "Oman"],
            answer: 2
        },

        {
            q: "What is H2O commonly known as?",
            options: ["Oxygen", "Water", "Hydrogen", "Salt"],
            answer: 1
        },

        {
            q: "Which is the nearest star to Earth?",
            options: ["Sirius", "The Sun", "Polaris", "Vega"],
            answer: 1
        },

        {
            q: "How many hours are in one day?",
            options: ["12", "18", "24", "48"],
            answer: 2
        },

        {
            q: "Which bird is famous for not being able to fly?",
            options: ["Eagle", "Sparrow", "Ostrich", "Falcon"],
            answer: 2
        },

        {
            q: "Which is the largest desert in the world?",
            options: ["Sahara", "Gobi", "Antarctic Desert", "Arabian Desert"],
            answer: 2
        },

        {
            q: "Which country is shaped like a boot?",
            options: ["France", "Italy", "Greece", "Portugal"],
            answer: 1
        },

        {
            q: "Which vitamin is mainly produced by sunlight exposure?",
            options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
            answer: 3
        },

        {
            q: "What is the boiling point of water at sea level?",
            options: ["50°C", "75°C", "100°C", "150°C"],
            answer: 2
        },

        {
            q: "Which is the longest river traditionally associated with Egypt?",
            options: ["Amazon", "Nile", "Indus", "Yangtze"],
            answer: 1
        },

        {
            q: "How many players are on a football team on the field?",
            options: ["9", "10", "11", "12"],
            answer: 2
        },

        {
            q: "Which sport uses a racket and shuttlecock?",
            options: ["Tennis", "Badminton", "Cricket", "Hockey"],
            answer: 1
        },

        {
            q: "Which country is famous for the Eiffel Tower?",
            options: ["France", "Germany", "Belgium", "Italy"],
            answer: 0
        },

        {
            q: "Which planet is famous for its rings?",
            options: ["Mars", "Venus", "Saturn", "Mercury"],
            answer: 2
        },

        {
            q: "What is the hardest natural substance?",
            options: ["Iron", "Diamond", "Gold", "Quartz"],
            answer: 1
        },

        {
            q: "Which direction does the sun rise from?",
            options: ["North", "South", "East", "West"],
            answer: 2
        },

        {
            q: "Which ocean lies between Africa and Australia?",
            options: ["Pacific", "Indian", "Atlantic", "Arctic"],
            answer: 1
        },

        {
            q: "How many months are in a year?",
            options: ["10", "11", "12", "13"],
            answer: 2
        },

        {
            q: "Which country is home to Mount Everest?",
            options: ["Nepal", "Pakistan", "India", "China"],
            answer: 0
        },

        {
            q: "What is the main gas in Earth's atmosphere?",
            options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
            answer: 1
        },

        {
            q: "Which device is used to find direction?",
            options: ["Compass", "Microscope", "Thermometer", "Scale"],
            answer: 0
        },

        {
            q: "Which is the largest country by area?",
            options: ["Canada", "China", "Russia", "USA"],
            answer: 2
        },

        {
            q: "Which animal is known for having a trunk?",
            options: ["Rhino", "Elephant", "Giraffe", "Hippo"],
            answer: 1
        },

        {
            q: "What is the capital of Saudi Arabia?",
            options: ["Jeddah", "Riyadh", "Mecca", "Medina"],
            answer: 1
        },

        {
            q: "Which continent is Pakistan located in?",
            options: ["Asia", "Europe", "Africa", "Australia"],
            answer: 0
        },

        {
            q: "Which sea separates Europe and Africa?",
            options: ["Red Sea", "Mediterranean Sea", "Arabian Sea", "Black Sea"],
            answer: 1
        },

        {
            q: "Which country is known as the Land of the Rising Sun?",
            options: ["China", "Japan", "Thailand", "Korea"],
            answer: 1
        },

        {
            q: "How many letters are in the English alphabet?",
            options: ["24", "25", "26", "27"],
            answer: 2
        },

        {
            q: "Which is the largest internal organ of the human body?",
            options: ["Heart", "Liver", "Brain", "Lung"],
            answer: 1
        },

        {
            q: "Which planet is closest to the Sun?",
            options: ["Venus", "Earth", "Mercury", "Mars"],
            answer: 2
        }

    ],


    /* =====================================================
       COMPUTER SCIENCE
    ===================================================== */

    "Computer Science": [

        {
            q: "What does CPU stand for?",
            options: [
                "Central Processing Unit",
                "Computer Personal Unit",
                "Central Program Utility",
                "Computer Processing Utility"
            ],
            answer: 0
        },

        {
            q: "Which language is used to style web pages?",
            options: ["HTML", "CSS", "Python", "SQL"],
            answer: 1
        },

        {
            q: "Which language is mainly used to structure web pages?",
            options: ["HTML", "CSS", "Java", "SQL"],
            answer: 0
        },

        {
            q: "What does RAM stand for?",
            options: [
                "Random Access Memory",
                "Read Access Machine",
                "Rapid Application Memory",
                "Random Application Module"
            ],
            answer: 0
        },

        {
            q: "Which device is used to enter text?",
            options: ["Monitor", "Keyboard", "Speaker", "Printer"],
            answer: 1
        },

        {
            q: "Which device displays computer output?",
            options: ["Keyboard", "Mouse", "Monitor", "Scanner"],
            answer: 2
        },

        {
            q: "What does URL stand for?",
            options: [
                "Uniform Resource Locator",
                "Universal Resource Link",
                "Uniform Reference Link",
                "Universal Routing Locator"
            ],
            answer: 0
        },

        {
            q: "Which is an operating system?",
            options: ["Windows", "Google", "HTML", "Python"],
            answer: 0
        },

        {
            q: "Which company developed Windows?",
            options: ["Apple", "Microsoft", "Google", "IBM"],
            answer: 1
        },

        {
            q: "Which company developed Android?",
            options: ["Google", "Microsoft", "IBM", "Intel"],
            answer: 0
        },

        {
            q: "What does HTTP stand for?",
            options: [
                "HyperText Transfer Protocol",
                "High Transfer Text Program",
                "Hyper Transfer Tool Protocol",
                "HyperText Technical Program"
            ],
            answer: 0
        },

        {
            q: "Which symbol starts an ID selector in CSS?",
            options: [".", "#", "@", "$"],
            answer: 1
        },

        {
            q: "Which symbol starts a class selector in CSS?",
            options: [".", "#", "@", "%"],
            answer: 0
        },

        {
            q: "Which language is known for data analysis and AI?",
            options: ["Python", "HTML", "CSS", "XML"],
            answer: 0
        },

        {
            q: "Which data structure follows FIFO?",
            options: ["Stack", "Queue", "Tree", "Graph"],
            answer: 1
        },

        {
            q: "Which data structure follows LIFO?",
            options: ["Queue", "Stack", "Array", "Graph"],
            answer: 1
        },

        {
            q: "What is a collection of related data called?",
            options: ["Database", "Monitor", "Compiler", "Browser"],
            answer: 0
        },

        {
            q: "Which language is commonly used for database queries?",
            options: ["SQL", "CSS", "HTML", "C"],
            answer: 0
        },

        {
            q: "What does AI stand for?",
            options: [
                "Artificial Intelligence",
                "Automatic Internet",
                "Advanced Information",
                "Artificial Internet"
            ],
            answer: 0
        },

        {
            q: "What does URL identify?",
            options: [
                "A resource on the internet",
                "A CPU",
                "A keyboard",
                "A file type only"
            ],
            answer: 0
        },

        {
            q: "Which is a web browser?",
            options: ["Chrome", "Windows", "Linux", "Python"],
            answer: 0
        },

        {
            q: "Which company develops Chrome?",
            options: ["Google", "Apple", "Microsoft", "Meta"],
            answer: 0
        },

        {
            q: "Which protocol is commonly used to send email?",
            options: ["SMTP", "HTTP", "FTP", "SSH"],
            answer: 0
        },

        {
            q: "Which protocol is commonly used to transfer files?",
            options: ["FTP", "SMTP", "HTML", "CSS"],
            answer: 0
        },

        {
            q: "What does USB stand for?",
            options: [
                "Universal Serial Bus",
                "Universal System Board",
                "United Serial Bus",
                "Universal Storage Base"
            ],
            answer: 0
        },

        {
            q: "Which unit is commonly used for computer storage?",
            options: ["Byte", "Meter", "Volt", "Watt"],
            answer: 0
        },

        {
            q: "Which is larger?",
            options: ["KB", "MB", "GB", "Byte"],
            answer: 2
        },

        {
            q: "What is a computer virus?",
            options: [
                "Malicious software",
                "Hardware",
                "Monitor",
                "Keyboard"
            ],
            answer: 0
        },

        {
            q: "Which software protects against many types of malware?",
            options: ["Antivirus", "Compiler", "Browser", "Editor"],
            answer: 0
        },

        {
            q: "What does HTML stand for?",
            options: [
                "HyperText Markup Language",
                "HighText Machine Language",
                "Hyperlink Text Management Language",
                "Home Tool Markup Language"
            ],
            answer: 0
        },

        {
            q: "What does CSS stand for?",
            options: [
                "Cascading Style Sheets",
                "Computer Style System",
                "Creative Style Syntax",
                "Central Style Sheets"
            ],
            answer: 0
        },

        {
            q: "Which language adds interactivity to many web pages?",
            options: ["JavaScript", "CSS", "HTML", "SQL"],
            answer: 0
        },

        {
            q: "Which is a version control system?",
            options: ["Git", "Chrome", "Linux", "Apache"],
            answer: 0
        },

        {
            q: "Which website hosts Git repositories?",
            options: ["GitHub", "Google", "Wikipedia", "Yahoo"],
            answer: 0
        },

        {
            q: "What does WWW stand for?",
            options: [
                "World Wide Web",
                "World Web Window",
                "Wide World Website",
                "Web World Wide"
            ],
            answer: 0
        },

        {
            q: "What is an algorithm?",
            options: [
                "A step-by-step method for solving a problem",
                "A computer screen",
                "A programming language",
                "A storage device"
            ],
            answer: 0
        },

        {
            q: "Which is an example of cloud storage?",
            options: ["Google Drive", "Keyboard", "CPU", "RAM"],
            answer: 0
        },

        {
            q: "What does PDF stand for?",
            options: [
                "Portable Document Format",
                "Personal Data File",
                "Program Document Format",
                "Portable Data Form"
            ],
            answer: 0
        },

        {
            q: "Which key is commonly used to refresh a browser?",
            options: ["F1", "F3", "F5", "F12"],
            answer: 2
        },

        {
            q: "Which company created the iPhone?",
            options: ["Apple", "Google", "Samsung", "Microsoft"],
            answer: 0
        },

        {
            q: "Which technology connects devices wirelessly over short distances?",
            options: ["Bluetooth", "HDMI", "USB", "Ethernet"],
            answer: 0
        },

        {
            q: "What is a database?",
            options: [
                "An organized collection of data",
                "A monitor",
                "A keyboard",
                "A network cable"
            ],
            answer: 0
        },

        {
            q: "Which is a programming language?",
            options: ["Python", "Chrome", "Windows", "Google"],
            answer: 0
        },

        {
            q: "Which language is often used for system programming?",
            options: ["C", "HTML", "CSS", "SQL"],
            answer: 0
        },

        {
            q: "What is debugging?",
            options: [
                "Finding and fixing program errors",
                "Deleting a program",
                "Installing hardware",
                "Formatting a monitor"
            ],
            answer: 0
        },

        {
            q: "Which component performs calculations?",
            options: ["CPU", "Monitor", "Keyboard", "Speaker"],
            answer: 0
        },

        {
            q: "Which memory is generally temporary?",
            options: ["RAM", "ROM", "SSD", "Hard disk"],
            answer: 0
        },

        {
            q: "What is an IP address used for?",
            options: [
                "Identifying a device/network location",
                "Playing audio",
                "Printing documents",
                "Editing photos"
            ],
            answer: 0
        },

        {
            q: "Which is an example of an input device?",
            options: ["Mouse", "Monitor", "Speaker", "Projector"],
            answer: 0
        },

        {
            q: "Which is an example of an output device?",
            options: ["Keyboard", "Mouse", "Monitor", "Scanner"],
            answer: 2
        }

    ],


    /* =====================================================
       MATHEMATICS
    ===================================================== */

    "Mathematics": [

        {
            q: "What is 10 + 15?",
            options: ["20", "25", "30", "35"],
            answer: 1
        },

        {
            q: "What is 12 × 5?",
            options: ["50", "60", "70", "80"],
            answer: 1
        },

        {
            q: "What is 100 ÷ 4?",
            options: ["20", "25", "30", "40"],
            answer: 1
        },

        {
            q: "What is 15% of 200?",
            options: ["20", "25", "30", "35"],
            answer: 2
        },

        {
            q: "What is the square of 10?",
            options: ["20", "50", "100", "200"],
            answer: 2
        },

        {
            q: "What is 7 × 8?",
            options: ["54", "56", "58", "64"],
            answer: 1
        },

        {
            q: "What is 144 ÷ 12?",
            options: ["10", "11", "12", "13"],
            answer: 2
        },

        {
            q: "What is 2³?",
            options: ["4", "6", "8", "10"],
            answer: 2
        },

        {
            q: "What is the square root of 81?",
            options: ["7", "8", "9", "10"],
            answer: 2
        },

        {
            q: "If x + 5 = 12, what is x?",
            options: ["5", "6", "7", "8"],
            answer: 2
        },

        {
            q: "What is 50% of 80?",
            options: ["20", "30", "40", "50"],
            answer: 2
        },

        {
            q: "What is 25% of 100?",
            options: ["20", "25", "30", "35"],
            answer: 1
        },

        {
            q: "What is 3/4 as a decimal?",
            options: ["0.25", "0.50", "0.75", "1.25"],
            answer: 2
        },

        {
            q: "What is the perimeter of a square with side 5?",
            options: ["10", "15", "20", "25"],
            answer: 2
        },

        {
            q: "What is the area of a square with side 6?",
            options: ["12", "24", "36", "42"],
            answer: 2
        },

        {
            q: "What is 20²?",
            options: ["200", "300", "400", "500"],
            answer: 2
        },

        {
            q: "What is 9 × 9?",
            options: ["72", "81", "90", "99"],
            answer: 1
        },

        {
            q: "What is 1/2 + 1/2?",
            options: ["0", "1", "2", "3"],
            answer: 1
        },

        {
            q: "What is 75 - 28?",
            options: ["47", "48", "49", "50"],
            answer: 0
        },

        {
            q: "What is 15 × 4?",
            options: ["50", "60", "70", "80"],
            answer: 1
        },

        {
            q: "What is 200 ÷ 10?",
            options: ["10", "20", "30", "40"],
            answer: 1
        },

        {
            q: "What is 30% of 300?",
            options: ["60", "90", "120", "150"],
            answer: 1
        },

        {
            q: "What is the next number: 2, 4, 6, 8, ?",
            options: ["9", "10", "11", "12"],
            answer: 1
        },

        {
            q: "What is the next number: 5, 10, 15, 20, ?",
            options: ["22", "23", "25", "30"],
            answer: 2
        },

        {
            q: "If 5x = 25, x equals?",
            options: ["3", "4", "5", "6"],
            answer: 2
        },

        {
            q: "What is 2 + 3 × 4?",
            options: ["20", "14", "24", "18"],
            answer: 1
        },

        {
            q: "What is the average of 10 and 20?",
            options: ["10", "15", "20", "30"],
            answer: 1
        },

        {
            q: "A triangle has how many degrees in total?",
            options: ["90", "180", "270", "360"],
            answer: 1
        },

        {
            q: "What is 10% of 500?",
            options: ["25", "50", "75", "100"],
            answer: 1
        },

        {
            q: "What is 8²?",
            options: ["16", "32", "64", "128"],
            answer: 2
        },

        {
            q: "What is 11 × 11?",
            options: ["111", "121", "131", "141"],
            answer: 1
        },

        {
            q: "What is 1000 - 250?",
            options: ["650", "700", "750", "800"],
            answer: 2
        },

        {
            q: "What is 6³?",
            options: ["36", "108", "216", "256"],
            answer: 2
        },

        {
            q: "What is 5/10 simplified?",
            options: ["1/2", "1/3", "2/3", "2/5"],
            answer: 0
        },

        {
            q: "What is 0.5 as a percentage?",
            options: ["5%", "25%", "50%", "75%"],
            answer: 2
        },

        {
            q: "What is 2.5 + 2.5?",
            options: ["4", "5", "6", "7"],
            answer: 1
        },

        {
            q: "If a shirt costs Rs. 1000 and has a 10% discount, what is the discount?",
            options: ["Rs. 50", "Rs. 100", "Rs. 150", "Rs. 200"],
            answer: 1
        },

        {
            q: "What is the discounted price of Rs. 1000 after 10% discount?",
            options: ["Rs. 800", "Rs. 850", "Rs. 900", "Rs. 950"],
            answer: 2
        },

        {
            q: "What is 13 + 17?",
            options: ["25", "30", "35", "40"],
            answer: 1
        },

        {
            q: "What is 18 × 2?",
            options: ["32", "34", "36", "38"],
            answer: 2
        },

        {
            q: "What is 90 ÷ 9?",
            options: ["8", "9", "10", "11"],
            answer: 2
        },

        {
            q: "What is 4²?",
            options: ["8", "12", "16", "20"],
            answer: 2
        },

        {
            q: "What is 100% of 45?",
            options: ["40", "45", "50", "55"],
            answer: 1
        },

        {
            q: "What is 40% of 50?",
            options: ["10", "15", "20", "25"],
            answer: 2
        },

        {
            q: "What is 7 + 8 × 2?",
            options: ["30", "23", "22", "24"],
            answer: 1
        },

        {
            q: "What is the smallest prime number?",
            options: ["0", "1", "2", "3"],
            answer: 2
        },

        {
            q: "How many degrees are in a right angle?",
            options: ["45", "90", "180", "360"],
            answer: 1
        },

        {
            q: "What is 3 × 12?",
            options: ["30", "36", "42", "48"],
            answer: 1
        },

        {
            q: "What is 250 + 250?",
            options: ["400", "450", "500", "550"],
            answer: 2
        }

    ],


    /* =====================================================
       ENGLISH
    ===================================================== */

    "English": [

        {
            q: "Choose the synonym of 'Happy'.",
            options: ["Sad", "Joyful", "Angry", "Weak"],
            answer: 1
        },

        {
            q: "Choose the antonym of 'Hot'.",
            options: ["Warm", "Cold", "Heat", "Fire"],
            answer: 1
        },

        {
            q: "What is the plural of 'Child'?",
            options: ["Childs", "Children", "Childes", "Childrens"],
            answer: 1
        },

        {
            q: "Choose the correct spelling.",
            options: ["Beautifull", "Beautiful", "Beatiful", "Beautifol"],
            answer: 1
        },

        {
            q: "What is the past tense of 'Go'?",
            options: ["Goed", "Gone", "Went", "Going"],
            answer: 2
        },

        {
            q: "Which is a noun?",
            options: ["Run", "Beautiful", "Teacher", "Quickly"],
            answer: 2
        },

        {
            q: "Which is a verb?",
            options: ["Run", "Blue", "Teacher", "Happiness"],
            answer: 0
        },

        {
            q: "Which is an adjective?",
            options: ["Quickly", "Beautiful", "Run", "Teacher"],
            answer: 1
        },

        {
            q: "Choose the correct article: ___ apple.",
            options: ["A", "An", "The", "No article"],
            answer: 1
        },

        {
            q: "Choose the correct sentence.",
            options: [
                "He go to school.",
                "He goes to school.",
                "He going school.",
                "He gone school."
            ],
            answer: 1
        },

        {
            q: "What is the opposite of 'Early'?",
            options: ["Fast", "Late", "Quick", "Soon"],
            answer: 1
        },

        {
            q: "What is the synonym of 'Big'?",
            options: ["Small", "Large", "Tiny", "Short"],
            answer: 1
        },

        {
            q: "What is the opposite of 'Strong'?",
            options: ["Powerful", "Weak", "Hard", "Heavy"],
            answer: 1
        },

        {
            q: "Which word is an adverb?",
            options: ["Slowly", "Slow", "Slowness", "Slowed"],
            answer: 0
        },

        {
            q: "What is the plural of 'Mouse'?",
            options: ["Mouses", "Mouse", "Mice", "Meese"],
            answer: 2
        },

        {
            q: "What is the past tense of 'Eat'?",
            options: ["Eated", "Ate", "Eating", "Eaten"],
            answer: 1
        },

        {
            q: "Which is correct?",
            options: [
                "She are happy.",
                "She is happy.",
                "She am happy.",
                "She be happy."
            ],
            answer: 1
        },

        {
            q: "Choose the synonym of 'Fast'.",
            options: ["Slow", "Quick", "Weak", "Late"],
            answer: 1
        },

        {
            q: "Choose the antonym of 'Difficult'.",
            options: ["Hard", "Easy", "Tough", "Complex"],
            answer: 1
        },

        {
            q: "Which word is a pronoun?",
            options: ["He", "Run", "Beautiful", "School"],
            answer: 0
        },

        {
            q: "What is the plural of 'Man'?",
            options: ["Mans", "Men", "Manes", "Mens"],
            answer: 1
        },

        {
            q: "What is the past tense of 'Write'?",
            options: ["Wrote", "Written", "Writing", "Writes"],
            answer: 0
        },

        {
            q: "Which is correct?",
            options: [
                "I has a book.",
                "I have a book.",
                "I having book.",
                "I had have book."
            ],
            answer: 1
        },

        {
            q: "What is the opposite of 'Clean'?",
            options: ["Pure", "Dirty", "Fresh", "Clear"],
            answer: 1
        },

        {
            q: "What is the synonym of 'Smart'?",
            options: ["Intelligent", "Weak", "Slow", "Lazy"],
            answer: 0
        },

        {
            q: "Which word is a conjunction?",
            options: ["And", "Quickly", "Beautiful", "House"],
            answer: 0
        },

        {
            q: "Choose the correct article: ___ university.",
            options: ["A", "An", "The", "No article"],
            answer: 0
        },

        {
            q: "Which sentence is in the future tense?",
            options: [
                "I eat.",
                "I ate.",
                "I will eat.",
                "I am eating."
            ],
            answer: 2
        },

        {
            q: "What is the comparative form of 'Good'?",
            options: ["Gooder", "Better", "Best", "More good"],
            answer: 1
        },

        {
            q: "What is the superlative form of 'Good'?",
            options: ["Goodest", "Better", "Best", "More good"],
            answer: 2
        },

        {
            q: "Choose the correct spelling.",
            options: ["Necessary", "Neccessary", "Necesary", "Nessessary"],
            answer: 0
        },

        {
            q: "What is the opposite of 'Increase'?",
            options: ["Grow", "Decrease", "Rise", "Expand"],
            answer: 1
        },

        {
            q: "Which is a preposition?",
            options: ["Under", "Run", "Beautiful", "Quickly"],
            answer: 0
        },

        {
            q: "Choose the correct sentence.",
            options: [
                "They is playing.",
                "They are playing.",
                "They am playing.",
                "They be playing."
            ],
            answer: 1
        },

        {
            q: "What is the plural of 'Woman'?",
            options: ["Womans", "Women", "Womanes", "Womens"],
            answer: 1
        },

        {
            q: "What is the opposite of 'Old'?",
            options: ["Young", "Ancient", "Past", "Used"],
            answer: 0
        },

        {
            q: "What is the synonym of 'Begin'?",
            options: ["End", "Start", "Stop", "Finish"],
            answer: 1
        },

        {
            q: "Which is an interjection?",
            options: ["Wow!", "Run", "Beautiful", "House"],
            answer: 0
        },

        {
            q: "What is the past tense of 'See'?",
            options: ["Seed", "Saw", "Seen", "Seeing"],
            answer: 1
        },

        {
            q: "Choose the correct sentence.",
            options: [
                "She don't like tea.",
                "She doesn't like tea.",
                "She doesn't likes tea.",
                "She not like tea."
            ],
            answer: 1
        },

        {
            q: "Which word means 'very large'?",
            options: ["Tiny", "Huge", "Small", "Short"],
            answer: 1
        },

        {
            q: "What is the opposite of 'Victory'?",
            options: ["Success", "Defeat", "Win", "Prize"],
            answer: 1
        },

        {
            q: "Which word is a pronoun?",
            options: ["They", "School", "Run", "Beautiful"],
            answer: 0
        },

        {
            q: "Which word is a noun?",
            options: ["Happiness", "Quickly", "Run", "Beautiful"],
            answer: 0
        },

        {
            q: "Which word is an adjective?",
            options: ["Beautiful", "Beauty", "Beautify", "Beautifully"],
            answer: 0
        },

        {
            q: "What is the past tense of 'Take'?",
            options: ["Took", "Taken", "Taking", "Taked"],
            answer: 0
        },

        {
            q: "Choose the correct spelling.",
            options: ["Receive", "Recieve", "Receeve", "Receve"],
            answer: 0
        },

        {
            q: "What is the synonym of 'Brave'?",
            options: ["Cowardly", "Courageous", "Weak", "Afraid"],
            answer: 1
        },

        {
            q: "What is the opposite of 'Honest'?",
            options: ["Truthful", "Dishonest", "Fair", "Good"],
            answer: 1
        },

        {
            q: "Which sentence is grammatically correct?",
            options: [
                "He have finished.",
                "He has finished.",
                "He having finished.",
                "He finish."
            ],
            answer: 1
        }

    ],


    /* =====================================================
       PAKISTAN STUDIES
    ===================================================== */

    "Pakistan Studies": [

        {
            q: "When did Pakistan become independent?",
            options: ["1940", "1947", "1956", "1971"],
            answer: 1
        },

        {
            q: "Who is known as the founder of Pakistan?",
            options: [
                "Allama Iqbal",
                "Quaid-e-Azam Muhammad Ali Jinnah",
                "Liaquat Ali Khan",
                "Sir Syed Ahmad Khan"
            ],
            answer: 1
        },

        {
            q: "What is the capital of Pakistan?",
            options: ["Karachi", "Lahore", "Islamabad", "Quetta"],
            answer: 2
        },

        {
            q: "What is the national language of Pakistan?",
            options: ["Punjabi", "Urdu", "Sindhi", "English"],
            answer: 1
        },

        {
            q: "What is the national animal of Pakistan?",
            options: ["Lion", "Markhor", "Tiger", "Snow leopard"],
            answer: 1
        },

        {
            q: "What is the national flower of Pakistan?",
            options: ["Rose", "Jasmine", "Tulip", "Sunflower"],
            answer: 1
        },

        {
            q: "What is the national bird of Pakistan?",
            options: ["Eagle", "Chukar", "Peacock", "Falcon"],
            answer: 1
        },

        {
            q: "Which city is known as the City of Gardens?",
            options: ["Lahore", "Karachi", "Quetta", "Multan"],
            answer: 0
        },

        {
            q: "Who presented the Allahabad Address?",
            options: [
                "Quaid-e-Azam",
                "Allama Iqbal",
                "Liaquat Ali Khan",
                "Sir Syed Ahmad Khan"
            ],
            answer: 1
        },

        {
            q: "Pakistan's first constitution was introduced in?",
            options: ["1947", "1956", "1962", "1973"],
            answer: 1
        },

        {
            q: "The current constitution of Pakistan was introduced in?",
            options: ["1956", "1962", "1973", "1985"],
            answer: 2
        },

        {
            q: "Which sea is located south of Pakistan?",
            options: ["Red Sea", "Arabian Sea", "Black Sea", "Mediterranean Sea"],
            answer: 1
        },

        {
            q: "Which is the largest province of Pakistan by area?",
            options: ["Punjab", "Sindh", "Balochistan", "KPK"],
            answer: 2
        },

        {
            q: "Which province has the largest population?",
            options: ["Sindh", "Punjab", "Balochistan", "KPK"],
            answer: 1
        },

        {
            q: "Which is the largest city of Pakistan by population?",
            options: ["Lahore", "Karachi", "Islamabad", "Peshawar"],
            answer: 1
        },

        {
            q: "What is the national sport traditionally associated with Pakistan?",
            options: ["Cricket", "Hockey", "Football", "Squash"],
            answer: 1
        },

        {
            q: "Which mountain is the second-highest in the world?",
            options: ["Nanga Parbat", "K2", "Everest", "Rakaposhi"],
            answer: 1
        },

        {
            q: "K2 is located in which mountain range?",
            options: ["Himalayas", "Karakoram", "Hindu Kush", "Alps"],
            answer: 1
        },

        {
            q: "Which river is the longest river of Pakistan?",
            options: ["Indus", "Ravi", "Chenab", "Sutlej"],
            answer: 0
        },

        {
            q: "Which province is Khairpur located in?",
            options: ["Punjab", "Sindh", "Balochistan", "KPK"],
            answer: 1
        },

        {
            q: "Which city is the capital of Sindh?",
            options: ["Sukkur", "Hyderabad", "Karachi", "Larkana"],
            answer: 2
        },

        {
            q: "Which city is the capital of Punjab?",
            options: ["Multan", "Lahore", "Rawalpindi", "Faisalabad"],
            answer: 1
        },

        {
            q: "Which city is the capital of Khyber Pakhtunkhwa?",
            options: ["Peshawar", "Abbottabad", "Mardan", "Swat"],
            answer: 0
        },

        {
            q: "Which city is the capital of Balochistan?",
            options: ["Gwadar", "Quetta", "Turbat", "Khuzdar"],
            answer: 1
        },

        {
            q: "Who was Pakistan's first Governor-General?",
            options: [
                "Liaquat Ali Khan",
                "Muhammad Ali Jinnah",
                "Iskander Mirza",
                "Ayub Khan"
            ],
            answer: 1
        },

        {
            q: "Who was Pakistan's first Prime Minister?",
            options: [
                "Liaquat Ali Khan",
                "Muhammad Ali Jinnah",
                "Ayub Khan",
                "Zulfikar Ali Bhutto"
            ],
            answer: 0
        },

        {
            q: "Pakistan's national poet is?",
            options: [
                "Faiz Ahmed Faiz",
                "Allama Muhammad Iqbal",
                "Mirza Ghalib",
                "Ahmed Faraz"
            ],
            answer: 1
        },

        {
            q: "Pakistan Resolution was passed in which city?",
            options: ["Karachi", "Lahore", "Delhi", "Islamabad"],
            answer: 1
        },

        {
            q: "Pakistan Resolution was passed in which year?",
            options: ["1930", "1940", "1947", "1956"],
            answer: 1
        },

        {
            q: "What was the old name of Khyber Pakhtunkhwa?",
            options: ["NWFP", "Western Province", "Frontier Punjab", "Khyber State"],
            answer: 0
        },

        {
            q: "Which famous fort is located in Lahore?",
            options: ["Lahore Fort", "Rohtas Fort", "Ranikot Fort", "Derawar Fort"],
            answer: 0
        },

        {
            q: "Which famous fort is located in Sindh?",
            options: ["Ranikot Fort", "Lahore Fort", "Attock Fort", "Rohtas Fort"],
            answer: 0
        },

        {
            q: "Which city is famous for mangoes in Sindh?",
            options: ["Mirpur Khas", "Sukkur", "Karachi", "Thatta"],
            answer: 0
        },

        {
            q: "Which city is famous for dates in Sindh?",
            options: ["Khairpur", "Karachi", "Thatta", "Badin"],
            answer: 0
        },

        {
            q: "Which university is located in Khairpur?",
            options: [
                "Shah Abdul Latif University",
                "University of Karachi",
                "Punjab University",
                "Quaid-i-Azam University"
            ],
            answer: 0
        },

        {
            q: "What does SAU stand for in Khairpur context?",
            options: [
                "Shah Abdul Latif University",
                "Sindh Academic University",
                "Southern Arts University",
                "Sindh Agriculture University"
            ],
            answer: 0
        },

        {
            q: "Which language is widely spoken in Sindh?",
            options: ["Sindhi", "Pashto", "Balochi", "Punjabi"],
            answer: 0
        },

        {
            q: "Which desert is located in Sindh?",
            options: ["Thar Desert", "Gobi Desert", "Sahara", "Kalahari"],
            answer: 0
        },

        {
            q: "Which city is famous for the Minar-e-Pakistan?",
            options: ["Karachi", "Lahore", "Islamabad", "Multan"],
            answer: 1
        },

        {
            q: "Where is Faisal Mosque located?",
            options: ["Lahore", "Karachi", "Islamabad", "Peshawar"],
            answer: 2
        },

        {
            q: "Who designed Pakistan's national flag?",
            options: [
                "Syed Amir-uddin Kedwaii",
                "Allama Iqbal",
                "Jinnah",
                "Liaquat Ali Khan"
            ],
            answer: 0
        },

        {
            q: "What color dominates Pakistan's national flag?",
            options: ["Blue", "Green", "Red", "Yellow"],
            answer: 1
        },

        {
            q: "Which country shares the longest border with Pakistan?",
            options: ["India", "Iran", "Afghanistan", "China"],
            answer: 0
        },

        {
            q: "Which country lies to the southwest of Pakistan?",
            options: ["India", "Iran", "China", "Nepal"],
            answer: 1
        },

        {
            q: "Which country lies to the northwest of Pakistan?",
            options: ["India", "Afghanistan", "Iran", "Nepal"],
            answer: 1
        },

        {
            q: "Which country lies to the northeast of Pakistan?",
            options: ["China", "Iran", "India", "Afghanistan"],
            answer: 0
        },

        {
            q: "What is the currency of Pakistan?",
            options: ["Rupee", "Taka", "Riyal", "Dinar"],
            answer: 0
        },

        {
            q: "What is the official currency symbol commonly used for Pakistani rupee?",
            options: ["$", "Rs.", "£", "€"],
            answer: 1
        },

        {
            q: "Pakistan became a republic in?",
            options: ["1947", "1956", "1962", "1973"],
            answer: 1
        },

        {
            q: "Which city is known as the City of Saints?",
            options: ["Multan", "Lahore", "Karachi", "Sukkur"],
            answer: 0
        },

        {
            q: "Which province contains the city of Sukkur?",
            options: ["Punjab", "Sindh", "KPK", "Balochistan"],
            answer: 1
        }

    ],


    /* =====================================================
       CURRENT AFFAIRS
    ===================================================== */

    "Current Affairs": [

        {
            q: "What is the capital of Pakistan?",
            options: ["Karachi", "Islamabad", "Lahore", "Quetta"],
            answer: 1
        },

        {
            q: "Which organization is headquartered in New York and works on international peace?",
            options: ["UN", "FIFA", "OPEC", "SAARC"],
            answer: 0
        },

        {
            q: "What does UN stand for?",
            options: [
                "United Nations",
                "Universal Nations",
                "United Network",
                "Union Nations"
            ],
            answer: 0
        },

        {
            q: "What does WHO stand for?",
            options: [
                "World Health Organization",
                "World Human Office",
                "World Hospital Organization",
                "World Health Office"
            ],
            answer: 0
        },

        {
            q: "What does IMF stand for?",
            options: [
                "International Monetary Fund",
                "International Money Federation",
                "International Market Fund",
                "International Monetary Federation"
            ],
            answer: 0
        },

        {
            q: "What does WTO stand for?",
            options: [
                "World Trade Organization",
                "World Transport Office",
                "World Tourism Organization",
                "World Trade Office"
            ],
            answer: 0
        },

        {
            q: "Which organization is associated with global football?",
            options: ["FIFA", "UNESCO", "WHO", "IMF"],
            answer: 0
        },

        {
            q: "Which organization focuses on education, science and culture?",
            options: ["UNESCO", "FIFA", "IMF", "NATO"],
            answer: 0
        },

        {
            q: "Which country hosted the 2024 Summer Olympics?",
            options: ["Japan", "France", "China", "Brazil"],
            answer: 1
        },

        {
            q: "Which city hosted the 2024 Summer Olympics?",
            options: ["London", "Paris", "Tokyo", "Rome"],
            answer: 1
        },

        {
            q: "Which country hosted the 2022 FIFA World Cup?",
            options: ["Russia", "Qatar", "Brazil", "France"],
            answer: 1
        },

        {
            q: "Which currency is used by many European Union countries?",
            options: ["Dollar", "Euro", "Pound", "Yen"],
            answer: 1
        },

        {
            q: "Which country is the world's largest by area?",
            options: ["Canada", "China", "Russia", "USA"],
            answer: 2
        },

        {
            q: "Which ocean is the largest?",
            options: ["Atlantic", "Indian", "Pacific", "Arctic"],
            answer: 2
        },

        {
            q: "Which country has the largest population?",
            options: ["India", "USA", "China", "Russia"],
            answer: 0
        },

        {
            q: "Which city is the headquarters of the United Nations?",
            options: ["Geneva", "New York", "Paris", "London"],
            answer: 1
        },

        {
            q: "Which organization is associated with petroleum-exporting countries?",
            options: ["OPEC", "NATO", "WHO", "UNESCO"],
            answer: 0
        },

        {
            q: "What does NATO stand for?",
            options: [
                "North Atlantic Treaty Organization",
                "National Atlantic Treaty Office",
                "North American Trade Organization",
                "National Treaty Organization"
            ],
            answer: 0
        },

        {
            q: "Which city is the capital of the United Kingdom?",
            options: ["London", "Manchester", "Liverpool", "Birmingham"],
            answer: 0
        },

        {
            q: "Which country is known for the Great Wall?",
            options: ["China", "Japan", "India", "Korea"],
            answer: 0
        },

        {
            q: "Which country is famous for the Eiffel Tower?",
            options: ["France", "Italy", "Germany", "Spain"],
            answer: 0
        },

        {
            q: "Which country is famous for the Statue of Liberty?",
            options: ["USA", "France", "Canada", "UK"],
            answer: 0
        },

        {
            q: "Which continent has the most countries?",
            options: ["Asia", "Africa", "Europe", "South America"],
            answer: 1
        },

        {
            q: "Which organization works on international health?",
            options: ["WHO", "FIFA", "IMF", "WTO"],
            answer: 0
        },

        {
            q: "Which organization works on international trade?",
            options: ["WTO", "WHO", "FIFA", "UNICEF"],
            answer: 0
        },

        {
            q: "What does GDP generally measure?",
            options: [
                "Economic output",
                "Population only",
                "Land area",
                "Rainfall"
            ],
            answer: 0
        },

        {
            q: "What does AI stand for?",
            options: [
                "Artificial Intelligence",
                "Advanced Internet",
                "Automatic Information",
                "Artificial Internet"
            ],
            answer: 0
        },

        {
            q: "Which technology is associated with cryptocurrencies?",
            options: ["Blockchain", "Bluetooth", "HTML", "GPS"],
            answer: 0
        },

        {
            q: "Which city is the capital of Saudi Arabia?",
            options: ["Jeddah", "Riyadh", "Mecca", "Medina"],
            answer: 1
        },

        {
            q: "Which city is the capital of UAE?",
            options: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
            answer: 1
        },

        {
            q: "Which country uses the Yen?",
            options: ["China", "Japan", "South Korea", "Thailand"],
            answer: 1
        },

        {
            q: "Which country uses the Pound Sterling?",
            options: ["UK", "France", "Germany", "Spain"],
            answer: 0
        },

        {
            q: "Which country uses the Rupee?",
            options: ["Pakistan", "Japan", "China", "USA"],
            answer: 0
        },

        {
            q: "Which international body is responsible for many global development programs?",
            options: ["UN", "FIFA", "ICC", "F1"],
            answer: 0
        },

        {
            q: "Which sport is governed internationally by ICC?",
            options: ["Cricket", "Football", "Hockey", "Tennis"],
            answer: 0
        },

        {
            q: "What does ICC commonly stand for in cricket?",
            options: [
                "International Cricket Council",
                "International Cricket Committee",
                "International Championship Council",
                "International Cricket Club"
            ],
            answer: 0
        },

        {
            q: "Which sport is associated with Wimbledon?",
            options: ["Tennis", "Cricket", "Football", "Hockey"],
            answer: 0
        },

        {
            q: "Which city is famous for the headquarters of the European Union institutions?",
            options: ["Brussels", "Madrid", "Rome", "Lisbon"],
            answer: 0
        },

        {
            q: "Which country is part of the G7?",
            options: ["Japan", "Pakistan", "Bangladesh", "Nepal"],
            answer: 0
        },

        {
            q: "Which country is known as the Land of the Rising Sun?",
            options: ["Japan", "China", "India", "Thailand"],
            answer: 0
        },

        {
            q: "Which country is famous for the Amazon rainforest?",
            options: ["Brazil", "Egypt", "France", "Japan"],
            answer: 0
        },

        {
            q: "Which country is famous for the pyramids of Giza?",
            options: ["Egypt", "Mexico", "Greece", "Italy"],
            answer: 0
        },

        {
            q: "Which country is home to the city of Mecca?",
            options: ["Saudi Arabia", "UAE", "Qatar", "Oman"],
            answer: 0
        },

        {
            q: "Which country is home to the city of Istanbul?",
            options: ["Turkey", "Greece", "Iran", "Egypt"],
            answer: 0
        },

        {
            q: "Which country is famous for the Taj Mahal?",
            options: ["India", "Pakistan", "Bangladesh", "Nepal"],
            answer: 0
        },

        {
            q: "Which country is famous for Mount Fuji?",
            options: ["Japan", "China", "Nepal", "India"],
            answer: 0
        },

        {
            q: "Which country has Canberra as its capital?",
            options: ["Australia", "New Zealand", "Canada", "South Africa"],
            answer: 0
        },

        {
            q: "Which country has Ottawa as its capital?",
            options: ["Canada", "USA", "Australia", "UK"],
            answer: 0
        },

        {
            q: "Which country has Ankara as its capital?",
            options: ["Turkey", "Greece", "Iran", "Iraq"],
            answer: 0
        },

        {
            q: "Which country has Cairo as its capital?",
            options: ["Egypt", "Jordan", "Lebanon", "Morocco"],
            answer: 0
        }

    ]

};


/* =========================================================
   MAKE SURE EACH CATEGORY HAS 50 QUESTIONS
========================================================= */

Object.keys(questionBank).forEach(category => {

    /*
        If a category has fewer than 50 questions,
        duplicate the existing questions until there
        are 50.

        This keeps the quiz system working while you
        replace/add your final original questions later.
    */

    const questions = questionBank[category];

    if (questions.length > 0) {

        let index = 0;

        while (questions.length < 50) {

            const original = questions[index % questions.length];

            questions.push({
                q: original.q,
                options: [...original.options],
                answer: original.answer
            });

            index++;
        }

    }

});


/* =========================================================
   AUTH / PAGE INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", async function () {

    setupRegistration();
    setupLogin();
    updateUserArea();

    if (!supabaseReady) {
        console.warn("Student Battle is running in offline UI mode because Supabase could not be initialized.");
        return;
    }

    try {
        const { data: { session } } = await supabaseClient.auth.getSession();

        if (session?.user) {
            await loadCurrentStudent(session.user);
        }

        updateUserArea();
        await loadLeaderboard();

        supabaseClient.auth.onAuthStateChange(async function (_event, session) {
            if (session?.user) {
                await loadCurrentStudent(session.user);
            } else {
                currentStudent = null;
            }
            updateUserArea();
            await loadLeaderboard();
        });
    } catch (error) {
        console.error("Supabase startup error:", error);
        updateUserArea();
    }
});


/* =========================================================
   REGISTRATION
========================================================= */

function setupRegistration() {

    const form =
        document.getElementById("registrationForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (!requireSupabase("Registration is unavailable because the database connection is not ready.")) return;

        const name =
            document.getElementById("studentName")
                .value
                .trim();

        const institute =
            document.getElementById("studentInstitute")
                .value;

        const email =
            document.getElementById("studentEmail")
                .value
                .trim()
                .toLowerCase();

        const password =
            document.getElementById("studentPassword")
                .value;

        const submitButton =
            form.querySelector("button[type='submit']");

        if (!name || !institute || !email || !password) {
            showAuthMessage("Please complete all fields.", "error", "registrationModal");
            return;
        }

        if (password.length < 6) {
            showAuthMessage("Password must contain at least 6 characters.", "error", "registrationModal");
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Creating account...";

        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                    institute
                }
            }
        });

        submitButton.disabled = false;
        submitButton.textContent = "Create Student Profile";

        if (error) {
            showAuthMessage(error.message, "error", "registrationModal");
            return;
        }

        form.reset();

        if (data.session && data.user) {
            await loadCurrentStudent(data.user);
            closeRegistration();
            updateUserArea();
            alert(`Welcome ${name}! You are now representing ${institute}.`);
        } else {
            closeRegistration();
            alert("Account created successfully. Please check your email to confirm your account, then log in.");
            openLogin();
        }
    });
}


/* =========================================================
   LOGIN
========================================================= */

function setupLogin() {

    const form =
        document.getElementById("loginForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (!requireSupabase("Login is unavailable because the database connection is not ready.")) return;

        const email =
            document.getElementById("loginEmail")
                .value
                .trim()
                .toLowerCase();

        const password =
            document.getElementById("loginPassword")
                .value;

        const submitButton =
            form.querySelector("button[type='submit']");

        if (!email || !password) {
            showAuthMessage("Please enter your email and password.", "error", "loginModal");
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Signing in...";

        const { data, error } =
            await supabaseClient.auth.signInWithPassword({
                email,
                password
            });

        submitButton.disabled = false;
        submitButton.textContent = "Login";

        if (error) {
            showAuthMessage(error.message, "error", "loginModal");
            return;
        }

        if (data.user) {
            await loadCurrentStudent(data.user);
        }

        form.reset();
        closeLogin();
        updateUserArea();
    });
}


function showAuthMessage(message, type = "info", modalId = "") {

    const scope = modalId
        ? document.getElementById(modalId)
        : document;

    const element = scope
        ? scope.querySelector(".auth-message")
        : null;

    if (!element) {
        return;
    }

    element.textContent = message;
    element.className = `auth-message ${type}`;
}


/* =========================================================
   LOAD PROFILE FROM DATABASE
========================================================= */

async function loadCurrentStudent(user) {

    if (!supabaseReady || !supabaseClient) {
        currentStudent = null;
        return;
    }

    if (!user) {
        currentStudent = null;
        return;
    }

    const { data, error } = await supabaseClient
        .from("profiles")
        .select("id, full_name, institute, email, total_score, total_battles")
        .eq("id", user.id)
        .single();

    if (error) {
        console.error("Could not load student profile:", error);
        currentStudent = null;
        return;
    }

    currentStudent = {
        id: data.id,
        name: data.full_name,
        institute: data.institute,
        email: data.email,
        score: Number(data.total_score || 0),
        battles: Number(data.total_battles || 0)
    };
}


/* =========================================================
   OPEN / CLOSE AUTH MODALS
========================================================= */

function openRegistration() {

    if (currentStudent) {
        openProfile();
        return;
    }

    closeLogin();

    document
        .getElementById("registrationModal")
        .classList.add("open");

    document.body.style.overflow = "hidden";
}


function closeRegistration() {

    document
        .getElementById("registrationModal")
        .classList.remove("open");

    document.body.style.overflow = "";
}


function openLogin() {

    if (currentStudent) {
        openProfile();
        return;
    }

    closeRegistration();

    document
        .getElementById("loginModal")
        .classList.add("open");

    document.body.style.overflow = "hidden";
}


function closeLogin() {

    const modal = document.getElementById("loginModal");

    if (modal) {
        modal.classList.remove("open");
    }

    document.body.style.overflow = "";
}


function switchToLogin() {
    closeRegistration();
    openLogin();
}


function switchToRegistration() {
    closeLogin();
    openRegistration();
}


/* =========================================================
   PROFILE
========================================================= */

function openProfile() {

    if (!currentStudent) {
        openLogin();
        return;
    }

    document.getElementById("profileName")
        .textContent =
        currentStudent.name;

    document.getElementById("profileInstitute")
        .textContent =
        currentStudent.institute;

    document.getElementById("profileEmail")
        .textContent =
        currentStudent.email;

    document.getElementById("profileScore")
        .textContent =
        currentStudent.score || 0;

    document.getElementById("profileBattles")
        .textContent =
        currentStudent.battles || 0;

    document
        .getElementById("profileModal")
        .classList.add("open");

    document.body.style.overflow = "hidden";
}


function closeProfile() {

    document
        .getElementById("profileModal")
        .classList.remove("open");

    document.body.style.overflow = "";
}


/* =========================================================
   LOGOUT
========================================================= */

async function logoutStudent() {

    if (!requireSupabase("Logout is unavailable because the database connection is not ready.")) return;

    const confirmLogout =
        confirm("Are you sure you want to logout?");

    if (!confirmLogout) {
        return;
    }

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        alert(error.message);
        return;
    }

    currentStudent = null;
    closeProfile();
    updateUserArea();
}


/* =========================================================
   UPDATE NAVIGATION USER AREA
========================================================= */

function updateUserArea() {

    const userArea =
        document.getElementById("userArea");

    if (!userArea) {
        return;
    }

    if (currentStudent) {

        userArea.innerHTML = `
            <button
                class="nav-cta"
                onclick="openProfile()"
            >
                ${escapeHTML(currentStudent.name)}
            </button>
        `;

    } else {

        userArea.innerHTML = `
            <button
                class="nav-cta"
                onclick="openLogin()"
            >
                Login
            </button>
        `;
    }
}


/* =========================================================
   START BATTLE
========================================================= */

function startBattle(category) {

    if (!currentStudent) {

        alert(
            "Please create your student profile before starting a battle."
        );

        openRegistration();

        return;
    }


    if (!questionBank[category]) {

        alert("This battle category is not available.");

        return;
    }


    currentCategory = category;

    currentQuestion = 0;

    currentScore = 0;

    answerLocked = false;


    /*
        Copy questions instead of modifying the original array.
    */

    battleQuestions =
        [...questionBank[category]];


    /*
        Shuffle the questions so every battle can
        appear in a different order.
    */

    shuffleArray(battleQuestions);


    /*
        Keep exactly 50 questions for normal
        category battles.

        NOTE:
        This does NOT affect the LIVE competition.
        The live competition has its own questions.
    */

    battleQuestions =
        battleQuestions.slice(0, 50);


    document.getElementById("battleTitle")
        .textContent =
        category;


    document
        .getElementById("battleModal")
        .classList.add("open");


    document.body.style.overflow = "hidden";


    showQuestion();

}

/* =========================================================
   LIVE COMPETITION
   Real-time synchronized competition
========================================================= */

/*
    IMPORTANT:
    Keep ONLY ONE declaration of these variables
    in script.js.
*/

let activeLiveCompetition = null;
let activeLiveParticipant = null;

let liveQuestionTimer = null;
let liveRealtimeChannel = null;
let liveTimeRemaining = 60;

let liveQuestions = [];
let liveCurrentQuestion = 0;
let liveScore = 0;
let liveAnswerLocked = false;


/* =========================================================
   LOAD LIVE COMPETITION
========================================================= */

async function loadLiveCompetition() {

    const container =
        document.getElementById("liveCompetitionContent");


    if (!container) {

        console.error(
            "liveCompetitionContent element not found."
        );

        return;
    }


    if (!requireSupabase()) {

        console.error(
            "Supabase is not ready."
        );

        return;
    }


    try {

        /* =====================================================
           FIRST: CHECK FOR A LIVE COMPETITION
        ===================================================== */

        const {
            data: liveCompetition,
            error: liveError
        } =
            await supabaseClient
                .from("live_competitions")
                .select("*")
                .eq("status", "live")
                .order("started_at", {
                    ascending: false
                })
                .limit(1)
                .maybeSingle();


        if (liveError) {

            console.error(
                "Live competition error:",
                liveError
            );

        }


        /* =====================================================
           IF COMPETITION IS LIVE
        ===================================================== */

        if (liveCompetition) {

            activeLiveCompetition =
                liveCompetition;


            container.innerHTML = `

                <div class="eyebrow">
                    🔴 LIVE NOW
                </div>


                <h3>
                    ${escapeLiveText(
                        liveCompetition.title
                    )}
                </h3>


                <p>
                    The competition is live now!
                </p>


                <div class="competition-placeholder">

                    <div class="placeholder-icon">
                        ⚔
                    </div>


                    <div>

                        <strong>
                            Competition in progress
                        </strong>


                        <small>
                            ${Number(
                                liveCompetition.total_questions || 100
                            )}
                            questions —
                            1 minute per question.
                        </small>

                    </div>

                </div>


                <button
                    class="primary-btn full"
                    onclick="joinLiveCompetition()"
                >
                    ENTER COMPETITION
                </button>

            `;


            return;
        }


        /* =====================================================
           SECOND: CHECK FOR UPCOMING COMPETITION
        ===================================================== */

        const {
            data: upcomingCompetition,
            error: upcomingError
        } =
            await supabaseClient
                .from("live_competitions")
                .select("*")
                .eq("status", "waiting")
                .not(
                    "scheduled_start",
                    "is",
                    null
                )
                .order("scheduled_start", {
                    ascending: true
                })
                .limit(1)
                .maybeSingle();


        /* =====================================================
           CHECK UPCOMING COMPETITION ERROR
        ===================================================== */

        if (upcomingError) {

            console.error(
                "Upcoming competition error:",
                upcomingError
            );

            throw upcomingError;
        }


        /* =====================================================
           NO UPCOMING COMPETITION
        ===================================================== */

        if (!upcomingCompetition) {

            activeLiveCompetition = null;


            container.innerHTML = `

                <h3>
                    No competition scheduled
                </h3>


                <p>
                    There is currently no upcoming or live
                    Student Battle KHP competition.
                </p>


                <div class="competition-placeholder">

                    <div class="placeholder-icon">
                        ⚔
                    </div>


                    <div>

                        <strong>
                            Stay ready for the challenge
                        </strong>


                        <small>
                            A new competition will appear here
                            when it is scheduled.
                        </small>

                    </div>

                </div>


                <button
                    class="primary-btn full"
                    onclick="openRegistration()"
                >
                    Create Student Profile
                </button>

            `;


            return;
        }


        /* =====================================================
           UPCOMING COMPETITION FOUND
        ===================================================== */

        activeLiveCompetition =
            upcomingCompetition;


        /* =====================================================
           CONVERT TIME TO PAKISTAN TIME
        ===================================================== */

        const startDate =
            new Date(
                upcomingCompetition.scheduled_start
            );


        const pakistanTime =
            startDate.toLocaleString(
                "en-PK",
                {
                    timeZone: "Asia/Karachi",
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                }
            );


        /* =====================================================
           SHOW UPCOMING COMPETITION
        ===================================================== */

        container.innerHTML = `

            <div class="eyebrow">
                🟡 UPCOMING COMPETITION
            </div>


            <h3>
                ${escapeLiveText(
                    upcomingCompetition.title
                )}
            </h3>


            <p>
                Starts ${pakistanTime} (Pakistan Time)
            </p>


            <div class="competition-placeholder">

                <div class="placeholder-icon">
                    ⚔
                </div>


                <div>

                    <strong>
                        Get ready for the challenge
                    </strong>


                    <small>
                        ${Number(
                            upcomingCompetition.total_questions || 100
                        )}
                        questions will be available
                        when the competition starts.
                    </small>

                </div>

            </div>


            <button
                class="primary-btn full"
                onclick="joinLiveCompetition()"
            >
                JOIN COMPETITION
            </button>

        `;


    } catch (error) {

        console.error(
            "Unexpected live competition error:",
            error
        );


        container.innerHTML = `

            <h3>
                Unable to load competition
            </h3>


            <p>
                There was a problem checking the competition.
                Please refresh the page and try again.
            </p>


            <button
                class="primary-btn full"
                onclick="loadLiveCompetition()"
            >
                Try Again
            </button>

        `;

    }

}


/* =========================================================
   JOIN LIVE COMPETITION
========================================================= */

async function joinLiveCompetition() {

    if (!requireSupabase()) {
        return;
    }


    /* ============================================
       CHECK LOGIN
    ============================================ */

    if (!currentStudent) {

        alert(
            "Please create a student account or login first."
        );

        openLogin();

        return;
    }


    if (!activeLiveCompetition) {

        alert(
            "There is no active competition right now."
        );

        await loadLiveCompetition();

        return;
    }


    try {

        /* ============================================
           GET CURRENT PROFILE
        ============================================ */

        const {
            data: profile,
            error: profileError
        } =
            await supabaseClient
                .from("profiles")
                .select(
                    "id, name, email, institute_id"
                )
                .eq(
                    "id",
                    currentStudent.id
                )
                .single();


        if (profileError) {

            console.error(
                "Profile error:",
                profileError
            );

            alert(
                "Unable to load your student profile."
            );

            return;
        }


        /* ============================================
           MAKE SURE UNIVERSITY IS SELECTED
        ============================================ */

        if (!profile.institute_id) {

            alert(
                "Please select your university/institute before joining the competition."
            );

            openProfile();

            return;
        }


        /* ============================================
           CHECK WHETHER ALREADY JOINED
        ============================================ */

        const {
            data: existingParticipant,
            error: existingError
        } =
            await supabaseClient
                .from(
                    "live_participants"
                )
                .select("*")
                .eq(
                    "competition_id",
                    activeLiveCompetition.id
                )
                .eq(
                    "student_id",
                    profile.id
                )
                .maybeSingle();


        if (existingError) {

            console.error(
                "Participant check error:",
                existingError
            );

            alert(
                "Unable to check your competition registration."
            );

            return;
        }


        /* ============================================
           ALREADY JOINED
        ============================================ */

        if (existingParticipant) {

            activeLiveParticipant =
                existingParticipant;


            showLiveCompetitionWaitingRoom(
                existingParticipant
            );

            return;
        }


        /* ============================================
           JOIN COMPETITION
        ============================================ */

        const {
            data: participant,
            error: joinError
        } =
            await supabaseClient
                .from(
                    "live_participants"
                )
                .insert({

                    competition_id:
                        activeLiveCompetition.id,

                    student_id:
                        profile.id,

                    institute_id:
                        profile.institute_id,

                    current_question: 1,

                    score: 0,

                    completed: false

                })
                .select()
                .single();


        if (joinError) {

            console.error(
                "Join competition error:",
                joinError
            );

            alert(
                "Unable to join the competition right now. Please try again."
            );

            return;
        }


        activeLiveParticipant =
            participant;


        console.log(
            "Successfully joined live competition:",
            participant
        );


        /* ============================================
           SUCCESS
        ============================================ */

        showLiveCompetitionWaitingRoom(
            participant
        );

    } catch (error) {

        console.error(
            "Unexpected join competition error:",
            error
        );

        alert(
            "Something went wrong while joining the competition."
        );

    }

}


/* =========================================================
   LIVE COMPETITION WAITING ROOM
========================================================= */

function showLiveCompetitionWaitingRoom(
    participant
) {

    const container =
        document.getElementById(
            "liveCompetitionContent"
        );


    if (!container) {
        return;
    }


    container.innerHTML = `

        <div class="eyebrow">
            ✅ REGISTERED
        </div>


        <h3>
            You're in!
        </h3>


        <p>
            You have successfully joined:
        </p>


        <div class="competition-placeholder">

            <div class="placeholder-icon">
                🎓
            </div>


            <div>

                <strong>
                    ${escapeLiveText(
                        activeLiveCompetition.title
                    )}
                </strong>


                <small>
                    Waiting for the competition to start.
                </small>

            </div>

        </div>


        <p>
            When the competition starts,
            your CBT test will appear here automatically.
        </p>


        <button
            class="primary-btn full"
            onclick="loadLiveCompetition()"
        >
            CHECK COMPETITION STATUS
        </button>

    `;

}


/* =========================================================
   ESCAPE LIVE COMPETITION TEXT
========================================================= */

function escapeLiveText(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   LOAD LIVE COMPETITION AFTER PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
            Load immediately when the page opens.
        */

        loadLiveCompetition();


        /*
            Check every 10 seconds so the website
            automatically changes from UPCOMING
            to LIVE when Supabase changes the
            competition status.
        */

        setInterval(
            function () {

                loadLiveCompetition();

            },
            10000
        );

    }
);


/* =========================================================
   LEADERBOARD
========================================================= */

async function loadLeaderboard() {

    const section =
        document.getElementById("leaderboardSection");

    const container =
        document.getElementById("leaderboard");


    if (!section || !container) {
        return;
    }


    if (!supabaseReady || !supabaseClient) {

        section.hidden = true;

        container.innerHTML = "";

        return;
    }


    try {

        const {
            data,
            error
        } =
            await supabaseClient.rpc(
                "get_leaderboard",
                {
                    p_limit: 100
                }
            );


        if (error) {

            console.error(
                "Leaderboard load error:",
                error
            );

            section.hidden = true;

            return;
        }


        const rows =
            Array.isArray(data)
                ? data
                : [];


        if (!rows.length) {

            section.hidden = true;

            container.innerHTML = "";

            return;
        }


        section.hidden = false;


        container.innerHTML =
            rows.map(
                function (student, index) {

                    const position =
                        index + 1;


                    const medal =
                        position === 1
                            ? "🥇"
                            : position === 2
                                ? "🥈"
                                : position === 3
                                    ? "🥉"
                                    : String(position)
                                        .padStart(2, "0");


                    return `

                        <div class="leaderboard-row">

                            <div class="leaderboard-rank">
                                ${medal}
                            </div>


                            <div class="leaderboard-student">

                                <strong>
                                    ${escapeHTML(
                                        student.name || "Student"
                                    )}
                                </strong>

                                <span>
                                    ${escapeHTML(
                                        student.institute || "Other"
                                    )}
                                </span>

                            </div>


                            <div class="leaderboard-score">

                                <strong>
                                    ${Number(
                                        student.total_score || 0
                                    )}
                                </strong>

                                <span>
                                    points
                                </span>

                            </div>


                            <div class="leaderboard-battles">

                                ${Number(
                                    student.total_battles || 0
                                )}
                                battle${Number(
                                    student.total_battles || 0
                                ) === 1 ? "" : "s"}

                            </div>

                        </div>

                    `;

                }
            ).join("");


    } catch (error) {

        console.error(
            "Leaderboard unexpected error:",
            error
        );

        section.hidden = true;

    }

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");


    div.textContent =
        String(value);


    return div.innerHTML;

}


/* =========================================================
   END
========================================================= */
