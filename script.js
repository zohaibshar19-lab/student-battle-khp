/* =========================================================
   STUDENT BATTLE KHP
   SUPABASE CONNECTION
========================================================= */

/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL =
    "https://pndxiccvlmrnfhdefndr.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_vmd57FS2ifya67M1egLOfw_a2lDnyJa";

let supabaseClient =
    null;

let supabaseReady =
    false;


/* =========================================================
   INITIALIZE SUPABASE
========================================================= */

function initializeSupabase() {

    console.log(
        "========================================"
    );

    console.log(
        "INITIALIZING SUPABASE"
    );

    console.log(
        "Supabase URL:",
        SUPABASE_URL
    );

    console.log(
        "Supabase library:",
        window.supabase
    );

    console.log(
        "========================================"
    );


    /*
        Make sure the Supabase CDN library exists.
    */

    if (
        !window.supabase ||
        typeof window.supabase.createClient !==
        "function"
    ) {

        console.error(
            "SUPABASE JS LIBRARY NOT FOUND."
        );

        supabaseClient =
            null;

        supabaseReady =
            false;

        return false;
    }


    try {

        supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_PUBLISHABLE_KEY,
                {
                    auth: {

                        persistSession:
                            true,

                        autoRefreshToken:
                            true,

                        detectSessionInUrl:
                            true

                    }
                }
            );


        if (
            !supabaseClient
        ) {

            throw new Error(
                "Supabase createClient() returned an empty client."
            );
        }


        supabaseReady =
            true;


        console.log(
            "SUPABASE CLIENT CREATED SUCCESSFULLY."
        );


        return true;

    } catch (error) {

        console.error(
            "SUPABASE INITIALIZATION FAILED:",
            error
        );

        supabaseClient =
            null;

        supabaseReady =
            false;

        return false;
    }
}


/* =========================================================
   GET SUPABASE CLIENT
========================================================= */

function getLiveSupabaseClient() {

    /*
        If the client already exists,
        return it immediately.
    */

    if (
        supabaseReady &&
        supabaseClient
    ) {

        return supabaseClient;
    }


    /*
        Try to initialize it again.

        This is useful when script.js loads before
        the Supabase CDN script has finished loading.
    */

    const initialized =
        initializeSupabase();


    if (
        initialized &&
        supabaseClient
    ) {

        return supabaseClient;
    }


    console.error(
        "Supabase client is not available."
    );

    return null;
}


/* =========================================================
   REQUIRE SUPABASE
========================================================= */

function requireSupabase(
    message =
        "The online service is unavailable right now. Please try again in a moment."
) {

    const client =
        getLiveSupabaseClient();


    if (
        client
    ) {

        return true;
    }


    console.error(
        message
    );

    alert(
        message
    );

    return false;
}


/* =========================================================
   TEST SUPABASE CONNECTION
========================================================= */

async function testSupabaseConnection() {

    const client =
        getLiveSupabaseClient();


    if (
        !client
    ) {

        console.error(
            "SUPABASE CONNECTION TEST FAILED: Client unavailable."
        );

        return false;
    }


    console.log(
        "========================================"
    );

    console.log(
        "TESTING SUPABASE CONNECTION..."
    );


    try {

        /*
            We deliberately query a very small amount
            from live_competitions.

            If this returns a normal Supabase error,
            the network connection itself is working.

            If this produces:
                TypeError: Failed to fetch

            then the browser cannot complete the
            Supabase HTTP request.
        */

        const {
            data,
            error
        } =
            await client
                .from(
                    "live_competitions"
                )
                .select(
                    "id"
                )
                .limit(
                    1
                );


        if (
            error
        ) {

            console.error(
                "SUPABASE DATABASE REQUEST REACHED SUPABASE BUT RETURNED AN ERROR:",
                error
            );

            console.log(
                "This means the network connection is working."
            );

            console.log(
                "The remaining issue is likely table/RLS/schema related."
            );

            return false;
        }


        console.log(
            "SUPABASE CONNECTION SUCCESSFUL."
        );

        console.log(
            "Test data:",
            data
        );

        console.log(
            "========================================"
        );

        return true;

    } catch (error) {

        console.error(
            "SUPABASE CONNECTION TEST FAILED:",
            error
        );

        console.error(
            "The browser could not complete the request to Supabase."
        );

        console.log(
            "========================================"
        );

        return false;
    }
}


/* =========================================================
   INITIALIZE IMMEDIATELY
========================================================= */

initializeSupabase();


/* =========================================================
   CURRENT STUDENT
========================================================= */

let currentStudent =
    null;

    /* =========================================================
   SUPABASE CONNECTION TEST
========================================================= */

async function testSupabaseConnection() {

    console.log(
        "========================================"
    );

    console.log(
        "TESTING SUPABASE CONNECTION..."
    );

    console.log(
        "========================================"
    );


    const client =
        getLiveSupabaseClient();


    if (!client) {

        console.error(
            "SUPABASE CLIENT IS NULL."
        );

        return false;
    }


    try {

        const {
            data,
            error
        } =
            await client
                .from("live_competitions")
                .select(
                    "id"
                )
                .limit(1);


        if (error) {

            console.error(
                "SUPABASE DATABASE TEST FAILED:",
                error
            );

            console.error(
                "MESSAGE:",
                error.message
            );

            console.error(
                "DETAILS:",
                error.details
            );

            console.error(
                "HINT:",
                error.hint
            );

            console.error(
                "CODE:",
                error.code
            );

            return false;
        }


        console.log(
            "SUPABASE DATABASE CONNECTION WORKING:",
            data
        );


        return true;

    } catch (error) {

        console.error(
            "SUPABASE NETWORK TEST FAILED:",
            error
        );

        return false;
    }
}


/* =========================================================
   NORMAL QUIZ STATE
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
   LIVE COMPETITION STATE
========================================================= */

let activeLiveCompetition = null;
let activeLiveParticipant = null;
let liveCurrentQuestion = null;
let liveQuestionNumber = 1;
let liveTimer = null;
let liveSecondsRemaining = 60;
let liveAnswerLocked = false;
let liveAnswerSubmitting = false;
let liveCompetitionFinished = false;

let liveCompetitionStatusWatcher = null;
let lastKnownLiveCompetitionStatus = null;
let lastKnownLiveCompetitionId = null;


/* =========================================================
   SAFE SUPABASE CHECK
========================================================= */

function isLiveSupabaseReady() {

    try {

        if (
            typeof supabaseClient !== "undefined" &&
            supabaseClient
        ) {
            return true;
        }

        if (
            typeof window !== "undefined" &&
            window.supabaseClient
        ) {
            return true;
        }

    } catch (error) {

        console.error(
            "Supabase availability check failed:",
            error
        );
    }

    return false;
}


/* =========================================================
   GET SUPABASE CLIENT
========================================================= */

function getLiveSupabaseClient() {

    try {

        if (
            typeof supabaseClient !== "undefined" &&
            supabaseClient
        ) {
            return supabaseClient;
        }

    } catch (error) {}

    try {

        if (
            typeof window !== "undefined" &&
            window.supabaseClient
        ) {
            return window.supabaseClient;
        }

    } catch (error) {}

    return null;
}


/* =========================================================
   SAFE HTML ESCAPE
========================================================= */

if (
    typeof window.escapeHTML !== "function"
) {

    window.escapeHTML = function(value) {

        if (
            value === null ||
            value === undefined
        ) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };
}


/* =========================================================
   GET COMPETITION SCHEDULE TIME
========================================================= */

function getLiveCompetitionStartTime(
    competition
) {

    if (!competition) {
        return null;
    }

    const value =
        competition.scheduled_start;

    if (!value) {
        return null;
    }

    const timestamp =
        new Date(value).getTime();

    if (
        !Number.isFinite(timestamp)
    ) {
        return null;
    }

    return timestamp;
}


/* =========================================================
   AUTOMATICALLY START SCHEDULED COMPETITION
========================================================= */

async function activateScheduledLiveCompetition(
    competition
) {

    const client =
        getLiveSupabaseClient();

    if (!client || !competition) {
        return competition;
    }

    const status =
        String(
            competition.status || ""
        )
            .trim()
            .toLowerCase();

    if (
        ![
            "waiting",
            "scheduled",
            "pending"
        ].includes(status)
    ) {
        return competition;
    }

    const startTime =
        getLiveCompetitionStartTime(
            competition
        );

    if (!startTime) {
        return competition;
    }

    const now =
        Date.now();

    if (now < startTime) {
        return competition;
    }

    console.log(
        "Scheduled competition time reached. Starting competition..."
    );

    const startedAt =
        new Date().toISOString();

    const {
        data,
        error
    } =
        await client
            .from("live_competitions")
            .update({
                status: "live",
                started_at: startedAt,
                current_question:
                    Number(
                        competition.current_question || 0
                    )
            })
            .eq(
                "id",
                competition.id
            )
            .in(
                "status",
                [
                    "waiting",
                    "scheduled",
                    "pending"
                ]
            )
            .select("*")
            .maybeSingle();

    if (error) {

        console.error(
            "Could not automatically start competition:",
            error
        );

        return competition;
    }

    if (data) {

        console.log(
            "Competition is now LIVE:",
            data
        );

        return data;
    }

    /*
        Another browser may have started it first.
        Load the current row again.
    */

    const {
        data: latestCompetition,
        error: latestError
    } =
        await client
            .from("live_competitions")
            .select("*")
            .eq(
                "id",
                competition.id
            )
            .maybeSingle();

    if (latestError) {

        console.error(
            "Could not reload competition:",
            latestError
        );

        return competition;
    }

    return latestCompetition || competition;
}


/* =========================================================
   LOAD LIVE COMPETITION
========================================================= */

async function loadLiveCompetition() {

    const container =
        document.getElementById(
            "liveCompetitionContent"
        );

    if (!container) {

        console.error(
            "liveCompetitionContent element was not found."
        );

        return;
    }

    const client =
        getLiveSupabaseClient();

    if (!client) {

        container.innerHTML = `
            <div class="competition-placeholder">

                <div class="placeholder-icon">
                    ⚠️
                </div>

                <div>
                    <strong>
                        Database connection is not ready
                    </strong>

                    <small>
                        Please refresh the page and try again.
                    </small>
                </div>

            </div>

            <button
                type="button"
                class="primary-btn full"
                onclick="loadLiveCompetition()"
            >
                TRY AGAIN
            </button>
        `;

        return;
    }

    container.innerHTML = `
        <div class="eyebrow">
            ⚔ LIVE COMPETITION
        </div>

        <h3>
            Checking competition...
        </h3>

        <p>
            Please wait while we check the current competition.
        </p>
    `;

    try {

        const {
            data: competition,
            error
        } =
            await client
                .from("live_competitions")
                .select("*")
                .in(
                    "status",
                    [
                        "waiting",
                        "scheduled",
                        "pending",
                        "live",
                        "active",
                        "running",
                        "started"
                    ]
                )
                .order(
                    "scheduled_start",
                    {
                        ascending: true,
                        nullsFirst: false
                    }
                )
                .limit(1)
                .maybeSingle();

        if (error) {

            console.error(
                "Could not load live competition:",
                error
            );

            container.innerHTML = `
                <div class="competition-placeholder">

                    <div class="placeholder-icon">
                        ⚠️
                    </div>

                    <div>
                        <strong>
                            Could not load competition
                        </strong>

                        <small>
                            ${escapeHTML(
                                error.message ||
                                "Database error."
                            )}
                        </small>
                    </div>

                </div>

                <button
                    type="button"
                    class="primary-btn full"
                    onclick="loadLiveCompetition()"
                >
                    TRY AGAIN
                </button>
            `;

            return;
        }

        if (!competition) {

            activeLiveCompetition = null;
            activeLiveParticipant = null;
            liveCurrentQuestion = null;
            liveAnswerSubmitting = false;

            clearLiveQuestionTimer();

            container.innerHTML = `
                <div class="eyebrow">
                    ⚔ LIVE COMPETITION
                </div>

                <h3>
                    No competition available
                </h3>

                <p>
                    There is currently no Student Battle competition.
                </p>

                <div class="competition-placeholder">

                    <div class="placeholder-icon">
                        ⚔
                    </div>

                    <div>
                        <strong>
                            No active competition
                        </strong>

                        <small>
                            Please check again later.
                        </small>
                    </div>

                </div>

                <button
                    type="button"
                    class="primary-btn full"
                    onclick="loadLiveCompetition()"
                >
                    CHECK AGAIN
                </button>
            `;

            return;
        }


        /*
            IMPORTANT:

            If the scheduled time has arrived,
            automatically change waiting/scheduled/pending
            to live.
        */

        const activatedCompetition =
            await activateScheduledLiveCompetition(
                competition
            );

        activeLiveCompetition =
            activatedCompetition;


        const status =
            String(
                activatedCompetition.status || ""
            )
                .trim()
                .toLowerCase();


        if (
            status === "waiting" ||
            status === "scheduled" ||
            status === "pending"
        ) {

            await renderWaitingLiveCompetition();

            return;
        }


        if (
            status === "live" ||
            status === "active" ||
            status === "running" ||
            status === "started"
        ) {

            await prepareLiveCompetition();

            return;
        }


        container.innerHTML = `
            <div class="eyebrow">
                ⚔ LIVE COMPETITION
            </div>

            <h3>
                Competition unavailable
            </h3>

            <p>
                Current competition status:
                <strong>
                    ${escapeHTML(
                        activatedCompetition.status ||
                        "unknown"
                    )}
                </strong>
            </p>

            <button
                type="button"
                class="primary-btn full"
                onclick="loadLiveCompetition()"
            >
                CHECK AGAIN
            </button>
        `;

    } catch (error) {

        console.error(
            "Unexpected live competition error:",
            error
        );

        container.innerHTML = `
            <div class="competition-placeholder">

                <div class="placeholder-icon">
                    ⚠️
                </div>

                <div>
                    <strong>
                        Could not load competition
                    </strong>

                    <small>
                        ${escapeHTML(
                            error.message ||
                            "Unable to load competition."
                        )}
                    </small>
                </div>

            </div>

            <button
                type="button"
                class="primary-btn full"
                onclick="loadLiveCompetition()"
            >
                TRY AGAIN
            </button>
        `;
    }
}


/* =========================================================
   RENDER WAITING COMPETITION
========================================================= */

async function renderWaitingLiveCompetition() {

    const container =
        document.getElementById(
            "liveCompetitionContent"
        );

    if (!container) {
        return;
    }

    if (!currentStudent) {

        container.innerHTML = `
            <div class="eyebrow">
                ⚔ LIVE COMPETITION
            </div>

            <h3>
                ${escapeHTML(
                    activeLiveCompetition.title ||
                    "Student Battle KHP"
                )}
            </h3>

            <p>
                The competition is scheduled and ready.
                Create your student account to join.
            </p>

            <div class="competition-placeholder">

                <div class="placeholder-icon">
                    ⏳
                </div>

                <div>
                    <strong>
                        Competition has not started yet
                    </strong>

                    <small>
                        The competition will automatically become LIVE
                        at the scheduled time.
                    </small>
                </div>

            </div>

            <button
                type="button"
                class="primary-btn full"
                onclick="openRegistration()"
            >
                JOIN STUDENT BATTLE
            </button>
        `;

        return;
    }


    const client =
        getLiveSupabaseClient();

    if (!client) {
        return;
    }


    const {
        data: participant,
        error
    } =
        await client
            .from("live_participants")
            .select("*")
            .eq(
                "competition_id",
                activeLiveCompetition.id
            )
            .eq(
                "student_id",
                currentStudent.id
            )
            .maybeSingle();


    if (error) {

        console.error(
            "Could not check participant:",
            error
        );
    }


    if (participant) {

        activeLiveParticipant =
            participant;

        container.innerHTML = `
            <div class="eyebrow">
                ⚔ LIVE COMPETITION
            </div>

            <h3>
                ${escapeHTML(
                    activeLiveCompetition.title ||
                    "Student Battle KHP"
                )}
            </h3>

            <p>
                You are registered for this competition.
            </p>

            <div class="competition-placeholder">

                <div class="placeholder-icon">
                    ⏳
                </div>

                <div>
                    <strong>
                        Waiting for the competition to start
                    </strong>

                    <small>
                        The competition will automatically start
                        at the scheduled time.
                    </small>
                </div>

            </div>

            <button
                type="button"
                class="primary-btn full"
                onclick="loadLiveCompetition()"
            >
                CHECK STATUS
            </button>
        `;

        return;
    }


    container.innerHTML = `
        <div class="eyebrow">
            ⚔ LIVE COMPETITION
        </div>

        <h3>
            ${escapeHTML(
                activeLiveCompetition.title ||
                "Student Battle KHP"
            )}
        </h3>

        <p>
            Get ready! The competition has not started yet.
        </p>

        <div class="competition-placeholder">

            <div class="placeholder-icon">
                ⏳
            </div>

            <div>
                <strong>
                    Waiting to start
                </strong>

                <small>
                    You can join now and wait for the start.
                </small>
            </div>

        </div>

        <button
            type="button"
            class="primary-btn full"
            onclick="joinLiveCompetition()"
        >
            JOIN COMPETITION
        </button>
    `;
}


/* =========================================================
   PREPARE LIVE COMPETITION
========================================================= */

async function prepareLiveCompetition() {

    if (!activeLiveCompetition) {
        return;
    }

    const client =
        getLiveSupabaseClient();

    if (!client) {
        return;
    }

    if (!currentStudent) {

        const container =
            document.getElementById(
                "liveCompetitionContent"
            );

        if (container) {

            container.innerHTML = `
                <div class="eyebrow">
                    🔴 LIVE COMPETITION
                </div>

                <h3>
                    ${escapeHTML(
                        activeLiveCompetition.title ||
                        "Student Battle KHP"
                    )}
                </h3>

                <p>
                    The competition is LIVE now.
                </p>

                <button
                    type="button"
                    class="primary-btn full"
                    onclick="openLogin()"
                >
                    LOGIN TO PLAY
                </button>
            `;
        }

        return;
    }


    /*
        Check whether this student already joined.
    */

    const {
        data: participant,
        error
    } =
        await client
            .from("live_participants")
            .select("*")
            .eq(
                "competition_id",
                activeLiveCompetition.id
            )
            .eq(
                "student_id",
                currentStudent.id
            )
            .maybeSingle();


    if (error) {

        console.error(
            "Could not load live participant:",
            error
        );

        return;
    }


    if (!participant) {

        const container =
            document.getElementById(
                "liveCompetitionContent"
            );

        if (container) {

            container.innerHTML = `
                <div class="eyebrow">
                    🔴 LIVE COMPETITION
                </div>

                <h3>
                    ${escapeHTML(
                        activeLiveCompetition.title ||
                        "Student Battle KHP"
                    )}
                </h3>

                <p>
                    The competition is LIVE now.
                </p>

                <div class="competition-placeholder">

                    <div class="placeholder-icon">
                        🔴
                    </div>

                    <div>
                        <strong>
                            Competition is LIVE
                        </strong>

                        <small>
                            Join now to start answering questions.
                        </small>
                    </div>

                </div>

                <button
                    type="button"
                    class="primary-btn full"
                    onclick="joinLiveCompetition()"
                >
                    START COMPETITION
                </button>
            `;
        }

        return;
    }


    activeLiveParticipant =
        participant;


    if (
        participant.completed
    ) {

        liveCompetitionFinished =
            true;

        await showLiveCompletedScreen();

        return;
    }


    let savedQuestion =
        Number(
            participant.current_question || 1
        );


    if (
        !Number.isFinite(savedQuestion) ||
        savedQuestion < 1
    ) {

        savedQuestion = 1;
    }


    liveQuestionNumber =
        savedQuestion;


    liveAnswerLocked =
        false;


    liveAnswerSubmitting =
        false;


    await showLiveQuestion();
}


/* =========================================================
   JOIN LIVE COMPETITION
========================================================= */

async function joinLiveCompetition() {

    if (!currentStudent) {

        openLogin();

        return;
    }


    if (!activeLiveCompetition) {

        await loadLiveCompetition();

        return;
    }


    const client =
        getLiveSupabaseClient();

    if (!client) {

        alert(
            "Database connection is not ready."
        );

        return;
    }


    /*
        Make sure scheduled competition has started.
    */

    activeLiveCompetition =
        await activateScheduledLiveCompetition(
            activeLiveCompetition
        );


    const status =
        String(
            activeLiveCompetition.status || ""
        )
            .trim()
            .toLowerCase();


    if (
        ![
            "live",
            "active",
            "running",
            "started"
        ].includes(status)
    ) {

        await renderWaitingLiveCompetition();

        return;
    }


    try {

        const {
            data: existingParticipant,
            error: existingError
        } =
            await client
                .from("live_participants")
                .select("*")
                .eq(
                    "competition_id",
                    activeLiveCompetition.id
                )
                .eq(
                    "student_id",
                    currentStudent.id
                )
                .maybeSingle();


        if (existingError) {

            console.error(
                "Could not check participant:",
                existingError
            );

            alert(
                existingError.message
            );

            return;
        }


        if (existingParticipant) {

            activeLiveParticipant =
                existingParticipant;

        } else {

            const now =
                new Date().toISOString();


            const {
                data: newParticipant,
                error: joinError
            } =
                await client
                    .from("live_participants")
                    .insert({
                        competition_id:
                            activeLiveCompetition.id,

                        student_id:
                            currentStudent.id,

                        institute_id:
                            currentStudent.institute_id ||
                            null,

                        score:
                            0,

                        current_question:
                            1,

                        completed:
                            false,

                        question_started_at:
                            now
                    })
                    .select("*")
                    .single();


            if (joinError) {

                console.error(
                    "Could not join live competition:",
                    joinError
                );

                alert(
                    joinError.message
                );

                return;
            }


            activeLiveParticipant =
                newParticipant;
        }


        liveQuestionNumber =
            Number(
                activeLiveParticipant.current_question || 1
            );


        liveCompetitionFinished =
            false;


        liveAnswerLocked =
            false;


        liveAnswerSubmitting =
            false;


        await showLiveQuestion();


    } catch (error) {

        console.error(
            "Join competition failed:",
            error
        );

        alert(
            error.message ||
            "Could not join competition."
        );
    }
}


/* =========================================================
   GET LIVE QUESTIONS
========================================================= */

async function getLiveQuestions() {

    const client =
        getLiveSupabaseClient();

    if (!client) {
        return [];
    }


    /*
        Try the most common live question table.
    */

    const {
        data,
        error
    } =
        await client
            .from("live_questions")
            .select("*")
            .eq(
                "competition_id",
                activeLiveCompetition.id
            )
            .order(
                "question_number",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            "Could not load live questions:",
            error
        );

        return [];
    }


    return data || [];
}


/* =========================================================
   FIND LIVE QUESTION
========================================================= */

async function getLiveQuestionByNumber(
    questionNumber
) {
    const client =
        getLiveSupabaseClient();

    if (!client) {
        return null;
    }

    const {
        data,
        error
    } =
        await client
            .from("live_competition_questions")
            .select("*")
            .eq(
                "competition_id",
                activeLiveCompetition.id
            )
            .eq(
                "question_number",
                questionNumber
            )
            .maybeSingle();

    if (error) {
        console.error(
            "Could not load live competition question:",
            error
        );

        return null;
    }

    return data;
}

/* =========================================================
   LIVE QUESTION OPTIONS
========================================================= */

function getLiveQuestionOptions(
    question
) {

    if (!question) {
        return [];
    }


    if (
        Array.isArray(
            question.options
        )
    ) {

        return question.options
            .filter(
                option =>
                    option !== null &&
                    option !== undefined &&
                    String(option).trim() !== ""
            )
            .map(
                option =>
                    String(option)
            );
    }


    if (
        typeof question.options === "string"
    ) {

        const raw =
            question.options.trim();


        if (raw) {

            try {

                const parsed =
                    JSON.parse(raw);


                if (
                    Array.isArray(parsed)
                ) {

                    return parsed
                        .filter(
                            option =>
                                option !== null &&
                                option !== undefined &&
                                String(option).trim() !== ""
                        )
                        .map(
                            option =>
                                String(option)
                        );
                }

            } catch (error) {}


            if (
                raw.includes("|")
            ) {

                return raw
                    .split("|")
                    .map(
                        option =>
                            option.trim()
                    )
                    .filter(
                        option =>
                            option !== ""
                    );
            }


            if (
                raw.includes(",")
            ) {

                return raw
                    .split(",")
                    .map(
                        option =>
                            option.trim()
                    )
                    .filter(
                        option =>
                            option !== ""
                    );
            }
        }
    }


    const options = [

        question.option_a,
        question.option_b,
        question.option_c,
        question.option_d

    ];


    const filtered =
        options.filter(
            option =>
                option !== null &&
                option !== undefined &&
                String(option).trim() !== ""
        );


    if (
        filtered.length
    ) {

        return filtered.map(
            option =>
                String(option)
        );
    }


    return [];
}


/* =========================================================
   LIVE CORRECT ANSWER
========================================================= */

function getLiveCorrectAnswerIndex(
    answer
) {

    if (
        answer === undefined ||
        answer === null
    ) {

        return -1;
    }


    if (
        typeof answer === "number"
    ) {

        if (
            answer >= 0 &&
            answer <= 3
        ) {

            return answer;
        }


        if (
            answer >= 1 &&
            answer <= 4
        ) {

            return answer - 1;
        }
    }


    const normalized =
        String(answer)
            .trim()
            .toUpperCase();


    if (
        [
            "A",
            "B",
            "C",
            "D"
        ].includes(normalized)
    ) {

        return "ABCD".indexOf(
            normalized
        );
    }


    const numeric =
        Number(normalized);


    if (
        Number.isFinite(numeric)
    ) {

        if (
            numeric >= 0 &&
            numeric <= 3
        ) {

            return numeric;
        }


        if (
            numeric >= 1 &&
            numeric <= 4
        ) {

            return numeric - 1;
        }
    }


    return -1;
}


/* =========================================================
   SHOW LIVE QUESTION
========================================================= */

async function showLiveQuestion() {

    const container =
        document.getElementById(
            "liveCompetitionContent"
        );

    if (!container) {
        return;
    }


    if (
        !activeLiveCompetition ||
        !activeLiveParticipant
    ) {

        return;
    }


    const totalQuestions =
        Number(
            activeLiveCompetition.total_questions || 100
        );


    if (
        liveQuestionNumber >
        totalQuestions
    ) {

        await showLiveCompletedScreen();

        return;
    }


    clearLiveQuestionTimer();


    liveAnswerLocked =
        true;


    liveCurrentQuestion =
        await getLiveQuestionByNumber(
            liveQuestionNumber
        );


    if (!liveCurrentQuestion) {

        container.innerHTML = `
            <div class="eyebrow">
                🔴 LIVE COMPETITION
            </div>

            <h3>
                Question unavailable
            </h3>

            <p>
                Question ${liveQuestionNumber}
                could not be loaded.
            </p>

            <button
                type="button"
                class="primary-btn full"
                onclick="showLiveQuestion()"
            >
                TRY AGAIN
            </button>
        `;

        liveAnswerLocked =
            false;

        return;
    }


    const questionText =
        liveCurrentQuestion.question ||
        liveCurrentQuestion.question_text ||
        liveCurrentQuestion.q ||
        liveCurrentQuestion.text ||
        "";


    const options =
        getLiveQuestionOptions(
            liveCurrentQuestion
        );


    if (!options.length) {

        container.innerHTML = `
            <div class="eyebrow">
                🔴 LIVE COMPETITION
            </div>

            <h3>
                Question ${liveQuestionNumber}
            </h3>

            <p>
                ${escapeHTML(
                    questionText
                )}
            </p>

            <div class="competition-placeholder">

                <div class="placeholder-icon">
                    ⚠️
                </div>

                <div>
                    <strong>
                        Answer options unavailable
                    </strong>

                    <small>
                        This question has no usable answer options.
                    </small>
                </div>

            </div>
        `;

        return;
    }


    const score =
        await calculateLiveScoreFromAnswers();


    container.innerHTML = `

        <div class="eyebrow">
            🔴 LIVE COMPETITION
        </div>

        <h3>
            ${escapeHTML(
                activeLiveCompetition.title ||
                "Student Battle KHP"
            )}
        </h3>

        <div class="live-question-header">

            <span>
                Question
                ${liveQuestionNumber}
                of
                ${totalQuestions}
            </span>

            <span>
                Score:
                <strong>
                    ${score}
                </strong>
            </span>

        </div>

        <div
            id="liveTimer"
            class="live-timer"
        >
            60
        </div>

        <div
            class="live-question-text"
        >
            ${escapeHTML(
                questionText
            )}
        </div>

        <div
            id="liveAnswerOptions"
            class="answer-options"
        >

            ${options
                .map(
                    function(
                        option,
                        index
                    ) {

                        return `

                            <button
                                type="button"
                                class="answer-option"
                                onclick="selectLiveAnswer(${index})"
                            >

                                <span>
                                    ${String.fromCharCode(
                                        65 + index
                                    )}.
                                </span>

                                ${escapeHTML(
                                    option
                                )}

                            </button>

                        `;
                    }
                )
                .join("")}

        </div>

    `;


    liveAnswerLocked =
        false;


    /*
        Use the participant's existing question start time
        when possible. This prevents refreshing the page
        from giving a completely new timer.
    */

    let startedAt =
        activeLiveParticipant.question_started_at;


    if (!startedAt) {

        startedAt =
            new Date().toISOString();


        const updatedParticipant =
            await saveLiveParticipantProgress({

                current_question:
                    liveQuestionNumber,

                question_started_at:
                    startedAt,

                completed:
                    false

            });


        activeLiveParticipant =
            updatedParticipant;
    }


    const elapsedSeconds =
        Math.floor(
            (
                Date.now() -
                new Date(startedAt).getTime()
            ) / 1000
        );


    const remainingSeconds =
        Math.max(
            0,
            60 - elapsedSeconds
        );


    liveSecondsRemaining =
        remainingSeconds;


    if (
        remainingSeconds <= 0
    ) {

        await submitLiveAnswer(
            -1,
            true
        );

        return;
    }


    startLiveQuestionTimer(
        remainingSeconds
    );
}


/* =========================================================
   LIVE TIMER
========================================================= */

function startLiveQuestionTimer(
    seconds
) {

    clearLiveQuestionTimer();


    liveSecondsRemaining =
        Math.max(
            0,
            Number(seconds) || 0
        );


    updateLiveTimerDisplay();


    liveTimer =
        setInterval(
            async function() {

                liveSecondsRemaining -= 1;


                updateLiveTimerDisplay();


                if (
                    liveSecondsRemaining <= 0
                ) {

                    clearLiveQuestionTimer();


                    if (
                        !liveAnswerSubmitting &&
                        !liveCompetitionFinished &&
                        !liveAnswerLocked
                    ) {

                        liveAnswerLocked =
                            true;


                        await submitLiveAnswer(
                            -1,
                            true
                        );
                    }
                }

            },
            1000
        );
}


/* =========================================================
   UPDATE LIVE TIMER
========================================================= */

function updateLiveTimerDisplay() {

    const timer =
        document.getElementById(
            "liveTimer"
        );


    if (timer) {

        timer.textContent =
            Math.max(
                0,
                liveSecondsRemaining
            );
    }
}


/* =========================================================
   CLEAR LIVE TIMER
========================================================= */

function clearLiveQuestionTimer() {

    if (
        liveTimer
    ) {

        clearInterval(
            liveTimer
        );

        liveTimer =
            null;
    }
}


/* =========================================================
   SELECT LIVE ANSWER
========================================================= */

function selectLiveAnswer(
    selectedIndex
) {

    if (
        liveAnswerLocked ||
        liveAnswerSubmitting
    ) {

        return;
    }


    liveAnswerLocked =
        true;


    submitLiveAnswer(
        selectedIndex,
        false
    );
}


/* =========================================================
   SAVE LIVE ANSWER
========================================================= */

async function saveLiveAnswer(
    selectedAnswer,
    isCorrect,
    timedOut
) {

    const client =
        getLiveSupabaseClient();


    if (!client) {

        throw new Error(
            "Supabase client is not available."
        );
    }


    const payload = {

        competition_id:
            activeLiveCompetition.id,

        student_id:
            currentStudent.id,

        question_number:
            Number(
                liveQuestionNumber
            ),

        selected_answer:
            Number(
                selectedAnswer
            ),

        is_correct:
            Boolean(
                isCorrect
            ),

        answered_at:
            new Date().toISOString()

    };


    /*
        The unique database constraint protects against
        duplicate submissions.

        If the answer already exists, do not create a
        second answer.
    */

    const {
        data,
        error
    } =
        await client
            .from("live_answers")
            .insert(payload)
            .select("*")
            .single();


    if (error) {

        /*
            PostgreSQL unique violation.
            The answer was probably already submitted.
        */

        if (
            error.code === "23505"
        ) {

            const {
                data: existingAnswer,
                error: existingError
            } =
                await client
                    .from("live_answers")
                    .select("*")
                    .eq(
                        "competition_id",
                        activeLiveCompetition.id
                    )
                    .eq(
                        "student_id",
                        currentStudent.id
                    )
                    .eq(
                        "question_number",
                        Number(
                            liveQuestionNumber
                        )
                    )
                    .maybeSingle();


            if (existingError) {

                throw existingError;
            }


            if (existingAnswer) {

                return existingAnswer;
            }
        }


        throw error;
    }


    return data;
}


/* =========================================================
   CALCULATE LIVE SCORE FROM DATABASE
========================================================= */

async function calculateLiveScoreFromAnswers() {

    const client =
        getLiveSupabaseClient();


    if (
        !client ||
        !activeLiveCompetition ||
        !currentStudent
    ) {

        return 0;
    }


    const {
        data,
        error
    } =
        await client
            .from("live_answers")
            .select(
                "is_correct"
            )
            .eq(
                "competition_id",
                activeLiveCompetition.id
            )
            .eq(
                "student_id",
                currentStudent.id
            )
            .eq(
                "is_correct",
                true
            );


    if (error) {

        console.error(
            "Could not calculate live score:",
            error
        );

        throw error;
    }


    return Array.isArray(data)
        ? data.length
        : 0;
}


/* =========================================================
   SAVE PARTICIPANT PROGRESS
========================================================= */

async function saveLiveParticipantProgress(
    updates
) {

    const client =
        getLiveSupabaseClient();


    if (
        !client ||
        !activeLiveParticipant
    ) {

        throw new Error(
            "Live participant is not available."
        );
    }


    const {
        data,
        error
    } =
        await client
            .from("live_participants")
            .update(
                updates
            )
            .eq(
                "id",
                activeLiveParticipant.id
            )
            .select("*")
            .single();


    if (error) {

        console.error(
            "Could not save participant progress:",
            error
        );

        throw error;
    }


    return data;
}


/* =========================================================
   SUBMIT LIVE ANSWER
========================================================= */

async function submitLiveAnswer(
    selectedIndex,
    timedOut = false
) {

    if (
        !activeLiveCompetition ||
        !activeLiveParticipant ||
        !liveCurrentQuestion
    ) {

        console.error(
            "Cannot submit answer because live state is missing."
        );

        liveAnswerSubmitting =
            false;

        liveAnswerLocked =
            false;

        return;
    }


    if (
        liveAnswerSubmitting
    ) {

        return;
    }


    liveAnswerSubmitting =
        true;


    clearLiveQuestionTimer();


    const questionBeingSubmitted =
        Number(
            liveQuestionNumber
        );


    if (
        !Number.isFinite(
            questionBeingSubmitted
        ) ||
        questionBeingSubmitted < 1
    ) {

        liveAnswerSubmitting =
            false;

        liveAnswerLocked =
            false;

        return;
    }


    const buttons =
        document.querySelectorAll(
            "#liveAnswerOptions .answer-option"
        );


    buttons.forEach(
        function(button) {

            button.disabled =
                true;

        }
    );


    const normalizedSelectedAnswer =
        timedOut
            ? -1
            : Number(
                selectedIndex
            );


    const correctIndex =
        getLiveCorrectAnswerIndex(
            liveCurrentQuestion.correct_answer ??
            liveCurrentQuestion.answer ??
            liveCurrentQuestion.correctAnswer
        );


    const localIsCorrect =
        !timedOut &&
        normalizedSelectedAnswer >= 0 &&
        correctIndex >= 0 &&
        normalizedSelectedAnswer ===
            correctIndex;


    buttons.forEach(
        function(
            button,
            index
        ) {

            if (
                index ===
                correctIndex
            ) {

                button.classList.add(
                    "correct"
                );
            }


            if (
                !timedOut &&
                index ===
                normalizedSelectedAnswer &&
                !localIsCorrect
            ) {

                button.classList.add(
                    "incorrect"
                );
            }

        }
    );


    try {

        /*
            Save answer first.
        */

        await saveLiveAnswer(
            normalizedSelectedAnswer,
            localIsCorrect,
            timedOut
        );


        /*
            Recalculate score from database.
        */

        const newScore =
            await calculateLiveScoreFromAnswers();


        const totalQuestions =
            Number(
                activeLiveCompetition.total_questions ||
                100
            );


        const nextQuestion =
            questionBeingSubmitted + 1;


        /*
            Final question.
        */

        if (
            nextQuestion >
            totalQuestions
        ) {

            const finishedAt =
                new Date().toISOString();


            const updatedParticipant =
                await saveLiveParticipantProgress({

                    score:
                        newScore,

                    current_question:
                        totalQuestions,

                    completed:
                        true,

                    finished_at:
                        finishedAt,

                    question_started_at:
                        null

                });


            activeLiveParticipant =
                updatedParticipant;


            liveCompetitionFinished =
                true;


            liveAnswerSubmitting =
                false;


            liveAnswerLocked =
                true;


            clearLiveQuestionTimer();


            /*
                Mark competition finished only when all
                required participant work is complete.

                The competition itself remains controlled
                by the database/admin if multiple students
                are playing.
            */


            try {

                if (
                    typeof loadLeaderboard ===
                    "function"
                ) {

                    await loadLeaderboard();
                }

            } catch(error) {

                console.error(
                    "Leaderboard refresh failed:",
                    error
                );
            }


            await showLiveCompletedScreen();


            return;
        }


        /*
            Save progress for next question.
        */

        const nextQuestionStartedAt =
            new Date().toISOString();


        const updatedParticipant =
            await saveLiveParticipantProgress({

                score:
                    newScore,

                current_question:
                    nextQuestion,

                completed:
                    false,

                question_started_at:
                    nextQuestionStartedAt

            });


        activeLiveParticipant =
            updatedParticipant;


        liveQuestionNumber =
            nextQuestion;


        liveCurrentQuestion =
            null;


        liveAnswerSubmitting =
            false;


        liveAnswerLocked =
            true;


        /*
            Small delay so the feedback is visible.
        */

        setTimeout(
            async function() {

                try {

                    await showLiveQuestion();

                } catch(error) {

                    console.error(
                        "Could not show next live question:",
                        error
                    );

                    liveAnswerSubmitting =
                        false;

                    liveAnswerLocked =
                        false;
                }

            },
            400
        );


    } catch(error) {

        console.error(
            "LIVE ANSWER SUBMISSION FAILED:",
            error
        );


        liveAnswerSubmitting =
            false;


        liveAnswerLocked =
            false;


        buttons.forEach(
            function(button) {

                button.disabled =
                    false;

                button.classList.remove(
                    "correct",
                    "incorrect"
                );

            }
        );


        if (
            !liveCompetitionFinished
        ) {

            alert(
                "Your answer could not be saved.\n\n" +
                (
                    error?.message ||
                    "Please try again."
                )
            );


            /*
                Restart remaining timer based on the
                original question start time.
            */

            if (
                activeLiveParticipant &&
                activeLiveParticipant.question_started_at
            ) {

                const startedAt =
                    new Date(
                        activeLiveParticipant.question_started_at
                    );


                const elapsedSeconds =
                    Math.floor(
                        (
                            Date.now() -
                            startedAt.getTime()
                        ) /
                        1000
                    );


                const remaining =
                    Math.max(
                        0,
                        60 -
                        elapsedSeconds
                    );


                if (
                    remaining > 0
                ) {

                    startLiveQuestionTimer(
                        remaining
                    );
                }
            }
        }
    }
}


/* =========================================================
   SHOW COMPLETED SCREEN
========================================================= */

async function showLiveCompletedScreen() {

    const container =
        document.getElementById(
            "liveCompetitionContent"
        );


    if (!container) {
        return;
    }


    clearLiveQuestionTimer();


    let score =
        0;


    try {

        score =
            await calculateLiveScoreFromAnswers();

    } catch(error) {

        console.error(
            "Could not calculate final score:",
            error
        );

        score =
            Number(
                activeLiveParticipant?.score || 0
            );
    }


    const totalQuestions =
        Number(
            activeLiveCompetition?.total_questions ||
            100
        );


    container.innerHTML = `

        <div class="eyebrow">
            🏆 COMPETITION COMPLETE
        </div>

        <h3>
            Well done, ${escapeHTML(
                currentStudent?.name ||
                "Student"
            )}!
        </h3>

        <p>
            You have completed the live competition.
        </p>

        <div class="competition-placeholder">

            <div class="placeholder-icon">
                🏆
            </div>

            <div>
                <strong>
                    Final Score
                </strong>

                <small>
                    ${score}/${totalQuestions}
                </small>
            </div>

        </div>

        <button
            type="button"
            class="primary-btn full"
            onclick="loadLeaderboard()"
        >
            VIEW LEADERBOARD
        </button>

    `;
}


/* =========================================================
   CLEANUP LIVE COMPETITION
========================================================= */

function closeLiveCompetition() {

    clearLiveQuestionTimer();


    activeLiveCompetition =
        null;


    activeLiveParticipant =
        null;


    liveCurrentQuestion =
        null;


    liveQuestionNumber =
        1;


    liveSecondsRemaining =
        60;


    liveAnswerLocked =
        false;


    liveAnswerSubmitting =
        false;


    liveCompetitionFinished =
        false;
}


/* =========================================================
   REFRESH LIVE COMPETITION AFTER LOGIN
========================================================= */

async function refreshLiveCompetitionAfterLogin() {

    const client =
        getLiveSupabaseClient();


    if (!client) {
        return;
    }


    try {

        await loadLiveCompetition();

    } catch(error) {

        console.error(
            "Could not refresh live competition:",
            error
        );
    }
}


/* =========================================================
   RESTORE CURRENT STUDENT
========================================================= */

async function restoreCurrentStudent() {

    const client =
        getLiveSupabaseClient();


    if (!client) {
        return null;
    }


    try {

        const {
            data,
            error
        } =
            await client
                .auth
                .getSession();


        if (error) {

            console.error(
                "Could not restore Supabase session:",
                error
            );

            return null;
        }


        const session =
            data?.session;


        if (
            !session ||
            !session.user
        ) {

            currentStudent =
                null;

            return null;
        }


        await loadCurrentStudent(
            session.user
        );


        updateUserArea();


        return currentStudent;


    } catch(error) {

        console.error(
            "Could not restore current student:",
            error
        );

        return null;
    }
}


/* =========================================================
   LOAD CURRENT STUDENT PROFILE
========================================================= */

async function loadCurrentStudent(
    user
) {

    const client =
        getLiveSupabaseClient();


    if (!client || !user) {

        currentStudent =
            null;

        return;
    }


    const {
        data,
        error
    } =
        await client
            .from("profiles")
            .select(
                "id, full_name, institute, institute_id, email, total_score, total_battles"
            )
            .eq(
                "id",
                user.id
            )
            .single();


    if (error) {

        console.error(
            "Could not load student profile:",
            error
        );

        currentStudent =
            null;

        return;
    }


    currentStudent = {

        id:
            data.id,

        name:
            data.full_name,

        institute:
            data.institute,

        institute_id:
            data.institute_id,

        email:
            data.email ||
            user.email,

        score:
            Number(
                data.total_score || 0
            ),

        battles:
            Number(
                data.total_battles || 0
            )
    };
}


/* =========================================================
   LOAD LEADERBOARD
========================================================= */

async function loadLeaderboard() {

    const client =
        getLiveSupabaseClient();


    if (!client) {
        return;
    }


    const leaderboardSection =
        document.getElementById(
            "leaderboardSection"
        );


    const leaderboard =
        document.getElementById(
            "leaderboard"
        );


    if (
        !leaderboardSection ||
        !leaderboard
    ) {

        return;
    }


    try {

        const {
            data: latestCompetition,
            error: competitionError
        } =
            await client
                .from("live_competitions")
                .select(
                    "id, title, status, total_questions, finished_at, created_at"
                )
                .eq(
                    "status",
                    "finished"
                )
                .order(
                    "finished_at",
                    {
                        ascending: false
                    }
                )
                .limit(1)
                .maybeSingle();


        if (competitionError) {

            console.error(
                "Could not find latest finished competition:",
                competitionError
            );

            return;
        }


        if (!latestCompetition) {

            leaderboardSection.hidden =
                true;

            leaderboard.innerHTML =
                "";

            return;
        }


        const {
            data: participants,
            error: participantError
        } =
            await client
                .from("live_participants")
                .select(
                    "id, student_id, institute_id, score, completed, finished_at"
                )
                .eq(
                    "competition_id",
                    latestCompetition.id
                )
                .eq(
                    "completed",
                    true
                )
                .order(
                    "score",
                    {
                        ascending: false
                    }
                )
                .order(
                    "finished_at",
                    {
                        ascending: true
                    }
                );


        if (participantError) {

            console.error(
                "Could not load live competition results:",
                participantError
            );

            return;
        }


        if (
            !participants ||
            !participants.length
        ) {

            leaderboardSection.hidden =
                true;

            leaderboard.innerHTML =
                "";

            return;
        }


        leaderboardSection.hidden =
            false;


        const description =
            leaderboardSection.querySelector(
                ".section-heading p"
            );


        if (description) {

            description.textContent =
                latestCompetition.title;
        }


        leaderboard.innerHTML =
            participants
                .map(
                    function(
                        participant,
                        index
                    ) {

                        return `

                            <div class="leaderboard-item">

                                <div class="leaderboard-rank">
                                    ${index + 1}
                                </div>

                                <div class="leaderboard-player">

                                    <strong>
                                        Student
                                    </strong>

                                    <small>
                                        Live Competition
                                    </small>

                                </div>

                                <div class="leaderboard-score">

                                    <strong>
                                        ${Number(
                                            participant.score || 0
                                        )}/${Number(
                                            latestCompetition.total_questions || 0
                                        )}
                                    </strong>

                                </div>

                            </div>

                        `;
                    }
                )
                .join("");


    } catch(error) {

        console.error(
            "Leaderboard loading failed:",
            error
        );
    }
}


/* =========================================================
   REGISTRATION
========================================================= */

function setupRegistration() {

    const form =
        document.getElementById(
            "registrationForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const client =
                getLiveSupabaseClient();


            if (!client) {

                showAuthMessage(
                    "Registration is unavailable because the database connection is not ready.",
                    "error",
                    "registrationModal"
                );

                return;
            }


            const name =
                document
                    .getElementById(
                        "studentName"
                    )
                    .value
                    .trim();


            const institute =
                document
                    .getElementById(
                        "studentInstitute"
                    )
                    .value;


            const email =
                document
                    .getElementById(
                        "studentEmail"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById(
                        "studentPassword"
                    )
                    .value;


            const submitButton =
                form.querySelector(
                    "button[type='submit']"
                );


            if (
                !name ||
                !institute ||
                !email ||
                !password
            ) {

                showAuthMessage(
                    "Please complete all fields.",
                    "error",
                    "registrationModal"
                );

                return;
            }


            if (
                password.length < 6
            ) {

                showAuthMessage(
                    "Password must contain at least 6 characters.",
                    "error",
                    "registrationModal"
                );

                return;
            }


            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Creating account...";
            }


            const {
                data,
                error
            } =
                await client
                    .auth
                    .signUp({
                        email,
                        password,
                        options: {
                            data: {
                                full_name:
                                    name,

                                institute:
                                    institute
                            }
                        }
                    });


            if (submitButton) {

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "Create Student Profile";
            }


            if (error) {

                showAuthMessage(
                    error.message,
                    "error",
                    "registrationModal"
                );

                return;
            }


            form.reset();


            if (
                data.session &&
                data.user
            ) {

                await loadCurrentStudent(
                    data.user
                );


                closeRegistration();


                updateUserArea();


                alert(
                    `Welcome ${name}! You are now representing ${institute}.`
                );


                await refreshLiveCompetitionAfterLogin();


            } else {

                closeRegistration();


                alert(
                    "Account created successfully. Please check your email to confirm your account, then log in."
                );


                openLogin();
            }

        }
    );
}


/* =========================================================
   LOGIN
========================================================= */

function setupLogin() {

    const form =
        document.getElementById(
            "loginForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const client =
                getLiveSupabaseClient();


            if (!client) {

                showAuthMessage(
                    "Login is unavailable because the database connection is not ready.",
                    "error",
                    "loginModal"
                );

                return;
            }


            const email =
                document
                    .getElementById(
                        "loginEmail"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById(
                        "loginPassword"
                    )
                    .value;


            const submitButton =
                form.querySelector(
                    "button[type='submit']"
                );


            if (
                !email ||
                !password
            ) {

                showAuthMessage(
                    "Please enter your email and password.",
                    "error",
                    "loginModal"
                );

                return;
            }


            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Signing in...";
            }


            const {
                data,
                error
            } =
                await client
                    .auth
                    .signInWithPassword({
                        email,
                        password
                    });


            if (submitButton) {

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "Login";
            }


            if (error) {

                showAuthMessage(
                    error.message,
                    "error",
                    "loginModal"
                );

                return;
            }


            if (data.user) {

                await loadCurrentStudent(
                    data.user
                );
            }


            form.reset();


            closeLogin();


            updateUserArea();


            await refreshLiveCompetitionAfterLogin();

        }
    );
}


/* =========================================================
   AUTH MESSAGE
========================================================= */

function showAuthMessage(
    message,
    type = "info",
    modalId = ""
) {

    const scope =
        modalId
            ? document.getElementById(
                modalId
            )
            : document;


    const element =
        scope
            ? scope.querySelector(
                ".auth-message"
            )
            : null;


    if (!element) {
        return;
    }


    element.textContent =
        message;


    element.className =
        `auth-message ${type}`;
}


/* =========================================================
   AUTH MODALS
========================================================= */

function openRegistration() {

    if (currentStudent) {

        openProfile();

        return;
    }


    closeLogin();


    const modal =
        document.getElementById(
            "registrationModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.add(
        "open"
    );


    document.body.style.overflow =
        "hidden";
}


function closeRegistration() {

    const modal =
        document.getElementById(
            "registrationModal"
        );


    if (modal) {

        modal.classList.remove(
            "open"
        );
    }


    document.body.style.overflow =
        "";
}


function openLogin() {

    if (currentStudent) {

        openProfile();

        return;
    }


    closeRegistration();


    const modal =
        document.getElementById(
            "loginModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.add(
        "open"
    );


    document.body.style.overflow =
        "hidden";
}


function closeLogin() {

    const modal =
        document.getElementById(
            "loginModal"
        );


    if (modal) {

        modal.classList.remove(
            "open"
        );
    }


    document.body.style.overflow =
        "";
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


    const name =
        document.getElementById(
            "profileName"
        );


    const institute =
        document.getElementById(
            "profileInstitute"
        );


    const email =
        document.getElementById(
            "profileEmail"
        );


    const score =
        document.getElementById(
            "profileScore"
        );


    const battles =
        document.getElementById(
            "profileBattles"
        );


    if (name) {

        name.textContent =
            currentStudent.name;
    }


    if (institute) {

        institute.textContent =
            currentStudent.institute ||
            "Other";
    }


    if (email) {

        email.textContent =
            currentStudent.email;
    }


    if (score) {

        score.textContent =
            currentStudent.score ||
            0;
    }


    if (battles) {

        battles.textContent =
            currentStudent.battles ||
            0;
    }


    const modal =
        document.getElementById(
            "profileModal"
        );


    if (modal) {

        modal.classList.add(
            "open"
        );

        document.body.style.overflow =
            "hidden";
    }
}


function closeProfile() {

    const modal =
        document.getElementById(
            "profileModal"
        );


    if (modal) {

        modal.classList.remove(
            "open"
        );
    }


    document.body.style.overflow =
        "";
}


/* =========================================================
   LOGOUT
========================================================= */

async function logoutStudent() {

    const client =
        getLiveSupabaseClient();


    if (!client) {

        alert(
            "Logout is unavailable because the database connection is not ready."
        );

        return;
    }


    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) {
        return;
    }


    const {
        error
    } =
        await client
            .auth
            .signOut();


    if (error) {

        alert(
            error.message
        );

        return;
    }


    currentStudent =
        null;


    closeProfile();


    updateUserArea();


    closeLiveCompetition();
}


/* =========================================================
   UPDATE USER AREA
========================================================= */

function updateUserArea() {

    const userArea =
        document.getElementById(
            "userArea"
        );


    if (!userArea) {
        return;
    }


    if (currentStudent) {

        userArea.innerHTML = `

            <button
                class="nav-cta"
                onclick="openProfile()"
            >
                ${escapeHTML(
                    currentStudent.name
                )}
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
   NORMAL QUESTION OPTIONS HELPER
   NOTE:
   YOUR SIX CATEGORY QUESTION BANK IS NOT TOUCHED.
========================================================= */

function getNormalQuestionOptions(
    question
) {

    if (!question) {
        return [];
    }


    if (
        Array.isArray(
            question.options
        )
    ) {

        return question.options
            .filter(
                option =>
                    option !== null &&
                    option !== undefined &&
                    String(option).trim() !== ""
            )
            .map(
                option =>
                    String(option)
            );
    }


    if (
        typeof question.options ===
        "string"
    ) {

        const raw =
            question.options.trim();


        if (raw) {

            try {

                const parsed =
                    JSON.parse(
                        raw
                    );


                if (
                    Array.isArray(parsed)
                ) {

                    return parsed
                        .filter(
                            option =>
                                option !== null &&
                                option !== undefined &&
                                String(option).trim() !== ""
                        )
                        .map(
                            option =>
                                String(option)
                        );
                }

            } catch(error) {}


            if (
                raw.includes("|")
            ) {

                return raw
                    .split("|")
                    .map(
                        option =>
                            option.trim()
                    )
                    .filter(
                        option =>
                            option !== ""
                    );
            }


            if (
                raw.includes(",")
            ) {

                return raw
                    .split(",")
                    .map(
                        option =>
                            option.trim()
                    )
                    .filter(
                        option =>
                            option !== ""
                    );
            }
        }
    }


    if (
        Array.isArray(
            question.choices
        )
    ) {

        return question.choices
            .filter(
                option =>
                    option !== null &&
                    option !== undefined &&
                    String(option).trim() !== ""
            )
            .map(
                option =>
                    String(option)
            );
    }


    if (
        Array.isArray(
            question.answers
        )
    ) {

        return question.answers
            .filter(
                option =>
                    option !== null &&
                    option !== undefined &&
                    String(option).trim() !== ""
            )
            .map(
                option =>
                    String(option)
            );
    }


    const options = [

        question.option_a,
        question.option_b,
        question.option_c,
        question.option_d

    ];


    const filtered =
        options.filter(
            option =>
                option !== null &&
                option !== undefined &&
                String(option).trim() !== ""
        );


    if (
        filtered.length
    ) {

        return filtered.map(
            option =>
                String(option)
        );
    }


    const camelOptions = [

        question.optionA,
        question.optionB,
        question.optionC,
        question.optionD

    ];


    const camelFiltered =
        camelOptions.filter(
            option =>
                option !== null &&
                option !== undefined &&
                String(option).trim() !== ""
        );


    if (
        camelFiltered.length
    ) {

        return camelFiltered.map(
            option =>
                String(option)
        );
    }


    const letterOptions = [

        question.a,
        question.b,
        question.c,
        question.d

    ];


    const letterFiltered =
        letterOptions.filter(
            option =>
                option !== null &&
                option !== undefined &&
                String(option).trim() !== ""
        );


    if (
        letterFiltered.length
    ) {

        return letterFiltered.map(
            option =>
                String(option)
        );
    }


    return [];
}


/* =========================================================
   NORMAL QUESTION CORRECT ANSWER
========================================================= */

function getNormalCorrectAnswer(
    question
) {

    if (!question) {
        return -1;
    }


    let answer =
        question.answer;


    if (
        answer === undefined ||
        answer === null
    ) {

        answer =
            question.correct_answer;
    }


    if (
        answer === undefined ||
        answer === null
    ) {

        answer =
            question.correctAnswer;
    }


    if (
        answer === undefined ||
        answer === null
    ) {

        answer =
            question.correct_option;
    }


    if (
        answer === undefined ||
        answer === null
    ) {

        answer =
            question.correct_option_index;
    }


    if (
        answer === undefined ||
        answer === null
    ) {

        answer =
            question.correct_index;
    }


    if (
        typeof answer ===
        "number"
    ) {

        if (
            answer >= 0 &&
            answer <= 3
        ) {

            return answer;
        }


        if (
            answer === 4
        ) {

            return 3;
        }
    }


    if (
        typeof answer ===
        "string"
    ) {

        const normalized =
            answer
                .trim()
                .toUpperCase();


        if (
            [
                "A",
                "B",
                "C",
                "D"
            ].includes(
                normalized
            )
        ) {

            return "ABCD".indexOf(
                normalized
            );
        }


        const numeric =
            Number(
                normalized
            );


        if (
            Number.isFinite(
                numeric
            )
        ) {

            if (
                numeric >= 0 &&
                numeric <= 3
            ) {

                return numeric;
            }


            if (
                numeric === 4
            ) {

                return 3;
            }
        }
    }


    return -1;
}


/* =========================================================
   START NORMAL BATTLE
========================================================= */

function startBattle(
    category
) {

    if (!currentStudent) {

        alert(
            "Please create your student profile before starting a battle."
        );

        openRegistration();

        return;
    }


    if (
        !questionBank ||
        !questionBank[category]
    ) {

        alert(
            "This battle category is not available."
        );

        return;
    }


    let categoryQuestions =
        questionBank[category];


    if (
        !Array.isArray(
            categoryQuestions
        )
    ) {

        if (
            categoryQuestions &&
            Array.isArray(
                categoryQuestions.questions
            )
        ) {

            categoryQuestions =
                categoryQuestions.questions;

        } else {

            console.error(
                "Invalid question category:",
                categoryQuestions
            );


            alert(
                "The questions for this category are not configured correctly."
            );


            return;
        }
    }


    if (
        !categoryQuestions.length
    ) {

        alert(
            "There are no questions available in this category."
        );

        return;
    }


    currentCategory =
        category;


    currentQuestion =
        0;


    currentScore =
        0;


    answerLocked =
        false;


    battleQuestions =
        [...categoryQuestions];


    shuffleArray(
        battleQuestions
    );


    battleQuestions =
        battleQuestions.slice(
            0,
            50
        );


    const title =
        document.getElementById(
            "battleTitle"
        );


    if (title) {

        title.textContent =
            category;
    }


    const modal =
        document.getElementById(
            "battleModal"
        );


    if (modal) {

        modal.classList.add(
            "open"
        );

        document.body.style.overflow =
            "hidden";
    }


    showQuestion();
}


/* =========================================================
   CLOSE BATTLE
========================================================= */

function closeBattle() {

    const battleModal =
        document.getElementById(
            "battleModal"
        );


    if (battleModal) {

        battleModal.classList.remove(
            "open"
        );
    }


    document.body.style.overflow =
        "";


    if (
        typeof battleTimer !==
        "undefined" &&
        battleTimer
    ) {

        clearInterval(
            battleTimer
        );

        battleTimer =
            null;
    }


    currentQuestion =
        0;


    currentScore =
        0;


    answerLocked =
        false;


    battleQuestions =
        [];
}


/* =========================================================
   SHOW NORMAL QUESTION
========================================================= */

function showQuestion() {

    const question =
        battleQuestions[
            currentQuestion
        ];


    if (!question) {

        finishBattle();

        return;
    }


    answerLocked =
        false;


    const questionText =
        document.getElementById(
            "questionText"
        );


    const optionsContainer =
        document.getElementById(
            "answerOptions"
        );


    const questionNumber =
        document.getElementById(
            "questionNumber"
        );


    const scoreElement =
        document.getElementById(
            "currentScore"
        );


    const text =
        question.q ||
        question.question ||
        question.question_text ||
        question.text ||
        "";


    if (questionText) {

        questionText.textContent =
            text;
    }


    if (questionNumber) {

        questionNumber.textContent =
            `Question ${currentQuestion + 1} of ${battleQuestions.length}`;
    }


    if (scoreElement) {

        scoreElement.textContent =
            currentScore;
    }


    const options =
        getNormalQuestionOptions(
            question
        );


    if (!optionsContainer) {

        console.error(
            "answerOptions element was not found."
        );

        return;
    }


    if (!options.length) {

        optionsContainer.innerHTML = `

            <div class="competition-placeholder">

                <div class="placeholder-icon">
                    ⚠️
                </div>

                <div>

                    <strong>
                        Answer options are unavailable
                    </strong>

                    <small>
                        This question does not contain
                        usable answer options.
                    </small>

                </div>

            </div>

        `;


        return;
    }


    optionsContainer.innerHTML =
        options
            .map(
                function(
                    option,
                    index
                ) {

                    return `

                        <button
                            type="button"
                            class="answer-option"
                            onclick="selectAnswer(${index})"
                        >

                            <span>
                                ${String.fromCharCode(
                                    65 + index
                                )}.
                            </span>

                            ${escapeHTML(
                                option
                            )}

                        </button>

                    `;
                }
            )
            .join("");
}


/* =========================================================
   SELECT NORMAL ANSWER
========================================================= */

function selectAnswer(
    selectedIndex
) {

    if (answerLocked) {
        return;
    }


    const question =
        battleQuestions[
            currentQuestion
        ];


    if (!question) {
        return;
    }


    answerLocked =
        true;


    const correctAnswer =
        getNormalCorrectAnswer(
            question
        );


    const buttons =
        document.querySelectorAll(
            ".answer-option"
        );


    buttons.forEach(
        function(
            button,
            index
        ) {

            button.disabled =
                true;


            if (
                index ===
                correctAnswer
            ) {

                button.classList.add(
                    "correct"
                );
            }


            if (
                index === selectedIndex &&
                selectedIndex !== correctAnswer
            ) {

                button.classList.add(
                    "incorrect"
                );
            }

        }
    );


    if (
        Number(selectedIndex) ===
        Number(correctAnswer)
    ) {

        currentScore += 1;
    }


    const scoreElement =
        document.getElementById(
            "currentScore"
        );


    if (scoreElement) {

        scoreElement.textContent =
            currentScore;
    }


    setTimeout(
        function() {

            currentQuestion += 1;

            showQuestion();

        },
        400
    );
}


/* =========================================================
   FINISH NORMAL BATTLE
========================================================= */

function finishBattle() {

    const modal =
        document.getElementById(
            "battleModal"
        );


    if (modal) {

        modal.classList.remove(
            "open"
        );
    }


    document.body.style.overflow =
        "";


    alert(
        `Battle complete! Your score is ${currentScore}/${battleQuestions.length}.`
    );
}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffleArray(
    array
) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];
    }


    return array;
}


/* =========================================================
   DO NOT MODIFY YOUR SIX CATEGORY QUESTION BANK
========================================================= */


/* =========================================================
   AUTH / PAGE INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async function() {

        setupRegistration();

        setupLogin();

        updateUserArea();


        const client =
            getLiveSupabaseClient();


        if (!client) {

            console.warn(
                "Student Battle is waiting for the Supabase client."
            );

            return;
        }


        try {

            const {
                data: {
                    session
                }
            } =
                await client
                    .auth
                    .getSession();


            if (
                session?.user
            ) {

                await loadCurrentStudent(
                    session.user
                );
            }


            updateUserArea();


            await loadLeaderboard();


            /*
                Load the live competition immediately.
            */

            await loadLiveCompetition();


        } catch(error) {

            console.error(
                "Supabase startup error:",
                error
            );


            updateUserArea();
        }
    }
);


/* =========================================================
   RESTORE LOGIN SESSION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async function() {

        try {

            await restoreCurrentStudent();

        } catch(error) {

            console.error(
                "Could not restore student on page load:",
                error
            );
        }
    }
);


/* =========================================================
   LIVE COMPETITION STATUS WATCHER
========================================================= */

function startLiveCompetitionStatusWatcher() {

    if (
        liveCompetitionStatusWatcher
    ) {

        return;
    }


    /*
        Check immediately.
    */

    checkLiveCompetitionStatus();


    /*
        Check every 5 seconds.

        This means the browser will notice very quickly
        when the scheduled time is reached.
    */

    liveCompetitionStatusWatcher =
        setInterval(
            async function() {

                await checkLiveCompetitionStatus();

            },
            5000
        );
}


/* =========================================================
   CHECK LIVE COMPETITION STATUS
========================================================= */

async function checkLiveCompetitionStatus() {

    const client =
        getLiveSupabaseClient();


    if (!client) {
        return;
    }


    try {

        const {
            data: competition,
            error
        } =
            await client
                .from("live_competitions")
                .select(
                    "id, title, status, total_questions, current_question, scheduled_start, started_at, finished_at, created_at"
                )
                .in(
                    "status",
                    [
                        "waiting",
                        "scheduled",
                        "pending",
                        "live",
                        "active",
                        "running",
                        "started"
                    ]
                )
                .order(
                    "scheduled_start",
                    {
                        ascending: true,
                        nullsFirst: false
                    }
                )
                .limit(1)
                .maybeSingle();


        if (error) {

            console.error(
                "Live competition status check failed:",
                error
            );

            return;
        }


        if (!competition) {
            return;
        }


        /*
            VERY IMPORTANT:

            If scheduled_start has arrived, this function
            changes waiting -> live automatically.
        */

        const activatedCompetition =
            await activateScheduledLiveCompetition(
                competition
            );


        const newStatus =
            String(
                activatedCompetition.status || ""
            )
                .trim()
                .toLowerCase();


        const competitionChanged =
            lastKnownLiveCompetitionId !==
                activatedCompetition.id ||
            lastKnownLiveCompetitionStatus !==
                newStatus;


        lastKnownLiveCompetitionId =
            activatedCompetition.id;


        lastKnownLiveCompetitionStatus =
            newStatus;


        activeLiveCompetition =
            activatedCompetition;


        /*
            If the competition just became LIVE,
            immediately load it.
        */

        if (
            competitionChanged ||
            [
                "live",
                "active",
                "running",
                "started"
            ].includes(newStatus)
        ) {

            await loadLiveCompetition();
        }


    } catch(error) {

        console.error(
            "Automatic live competition check failed:",
            error
        );
    }
}


/* =========================================================
   STOP LIVE STATUS WATCHER
========================================================= */

function stopLiveCompetitionStatusWatcher() {

    if (
        liveCompetitionStatusWatcher
    ) {

        clearInterval(
            liveCompetitionStatusWatcher
        );


        liveCompetitionStatusWatcher =
            null;
    }
}


/* =========================================================
   START WATCHER
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setTimeout(
            function() {

                startLiveCompetitionStatusWatcher();

            },
            1000
        );
    }
);


/* =========================================================
   PAGE UNLOAD CLEANUP
========================================================= */

window.addEventListener(
    "beforeunload",
    function() {

        clearLiveQuestionTimer();

        stopLiveCompetitionStatusWatcher();

    }
);


/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */

window.loadLiveCompetition =
    loadLiveCompetition;


window.renderWaitingLiveCompetition =
    renderWaitingLiveCompetition;


window.prepareLiveCompetition =
    prepareLiveCompetition;


window.joinLiveCompetition =
    joinLiveCompetition;


window.showLiveQuestion =
    showLiveQuestion;


window.selectLiveAnswer =
    selectLiveAnswer;


window.submitLiveAnswer =
    submitLiveAnswer;


window.openRegistration =
    openRegistration;


window.closeRegistration =
    closeRegistration;


window.openLogin =
    openLogin;


window.closeLogin =
    closeLogin;


window.switchToLogin =
    switchToLogin;


window.switchToRegistration =
    switchToRegistration;


window.openProfile =
    openProfile;


window.closeProfile =
    closeProfile;


window.logoutStudent =
    logoutStudent;


window.startBattle =
    startBattle;


window.closeBattle =
    closeBattle;


window.showQuestion =
    showQuestion;


window.selectAnswer =
    selectAnswer;


window.loadLeaderboard =
    loadLeaderboard;


window.refreshLiveCompetitionAfterLogin =
    refreshLiveCompetitionAfterLogin;


/* =========================================================
   SUPABASE CONNECTION TEST
========================================================= */

async function testSupabaseConnection() {

    console.log(
        "========================================"
    );

    console.log(
        "TESTING SUPABASE CONNECTION"
    );

    console.log(
        "URL:",
        typeof SUPABASE_URL !== "undefined"
            ? SUPABASE_URL
            : "Unknown"
    );

    console.log(
        "Client:",
        getLiveSupabaseClient()
    );

    console.log(
        "========================================"
    );


    const client =
        getLiveSupabaseClient();


    if (!client) {

        console.error(
            "SUPABASE CLIENT DOES NOT EXIST"
        );

        return;
    }


    try {

        const {
            data,
            error
        } =
            await client
                .from("live_competitions")
                .select("id")
                .limit(1);


        console.log(
            "SUPABASE TEST DATA:",
            data
        );


        console.log(
            "SUPABASE TEST ERROR:",
            error
        );


        if (error) {

            console.error(
                "SUPABASE CONNECTION REACHED DATABASE BUT QUERY FAILED:",
                error
            );

        } else {

            console.log(
                "SUPABASE CONNECTION WORKS"
            );
        }


    } catch(error) {

        console.error(
            "SUPABASE NETWORK REQUEST FAILED:",
            error
        );
    }
}


/* =========================================================
   CONNECTION TEST AFTER PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    function() {

        setTimeout(
            function() {

                testSupabaseConnection();

            },
            1500
        );

    }
);


/* =========================================================
   END
========================================================= */
