(function () {
  const notesLibrary = [
    {
      id: "study-skills",
      section: "Foundation Skills",
      title: "Study Skills and Revision Basics",
      summary: "Build focus, recall, note-making, and revision habits from the ground up.",
      level: "All learners",
      topics: [
        {
          heading: "Why study skills matter",
          points: [
            "Good study habits reduce stress because learners know what to do next.",
            "Learning improves when reading is followed by recall, writing, and practice.",
            "Short daily study sessions are easier to maintain than long irregular sessions."
          ]
        },
        {
          heading: "A simple study method",
          points: [
            "Read the topic once for understanding.",
            "Write three key ideas in your own words.",
            "Close the page and try to explain the idea from memory.",
            "Practice one question or quiz before moving on."
          ]
        },
        {
          heading: "Revision rules",
          points: [
            "Revise on the same day, then after a few days, then again after one week.",
            "Keep a mistake list so revision focuses on weak areas, not only easy topics.",
            "Use checklists to track completed topics."
          ]
        }
      ]
    },
    {
      id: "kindergarten-basics",
      section: "Primary Education",
      title: "Kindergarten Basics",
      summary: "Start with letters, sounds, colors, shapes, counting, and simple comparisons.",
      level: "Kindergarten",
      topics: [
        {
          heading: "Early literacy",
          points: [
            "Children first learn to recognize letters and connect them with sounds.",
            "Picture-word matching helps build vocabulary and memory.",
            "Short rhymes improve listening and pronunciation."
          ]
        },
        {
          heading: "Early numeracy",
          points: [
            "Counting objects is stronger than only repeating number names.",
            "Children should practice more, less, same, before, and after.",
            "Simple patterns build early logic."
          ]
        },
        {
          heading: "Learning through play",
          points: [
            "Sorting fruits, colors, animals, and shapes builds classification skills.",
            "Short quiz games work best when feedback is immediate and positive."
          ]
        }
      ]
    },
    {
      id: "primary-maths-english",
      section: "Primary Education",
      title: "Primary Maths and English",
      summary: "Clear notes on number sense, sentence building, and reading comprehension.",
      level: "Grades 1 to 5",
      topics: [
        {
          heading: "Maths basics",
          points: [
            "Place value helps learners understand ones, tens, hundreds, and beyond.",
            "Addition and subtraction become easier when numbers are lined up correctly.",
            "Multiplication is repeated addition, and division shares equally."
          ]
        },
        {
          heading: "English basics",
          points: [
            "A sentence needs a clear idea and proper punctuation.",
            "Reading comprehension improves when learners identify the main idea and key details.",
            "Vocabulary grows faster when new words are used in speech and writing."
          ]
        },
        {
          heading: "Practice advice",
          points: [
            "Use one reading task and one maths task every day.",
            "Correct mistakes slowly and explain why the correct answer works."
          ]
        }
      ]
    },
    {
      id: "primary-evs",
      section: "Primary Education",
      title: "Environmental Studies Basics",
      summary: "Simple notes on plants, animals, weather, community, and daily life science.",
      level: "Grades 1 to 5",
      topics: [
        {
          heading: "Living things",
          points: [
            "Plants need sunlight, air, water, and nutrients.",
            "Animals need food, shelter, and care.",
            "Living things grow and respond to their surroundings."
          ]
        },
        {
          heading: "Our surroundings",
          points: [
            "Weather changes daily and affects clothes, travel, and activities.",
            "Homes, schools, hospitals, and markets all support community life.",
            "Clean surroundings help people stay healthy."
          ]
        }
      ]
    },
    {
      id: "secondary-maths",
      section: "Secondary Education",
      title: "Secondary Maths Foundations",
      summary: "Strengthen fractions, ratio, algebra, geometry, and problem solving.",
      level: "Basic secondary",
      topics: [
        {
          heading: "Fractions and ratio",
          points: [
            "Fractions compare parts of a whole, and ratios compare two quantities.",
            "Keep units consistent before comparing or simplifying values."
          ]
        },
        {
          heading: "Algebra basics",
          points: [
            "Variables stand for unknown values.",
            "Equations stay balanced when the same operation is applied to both sides."
          ]
        },
        {
          heading: "Geometry and checking",
          points: [
            "Know the meaning of angle, area, perimeter, and volume before memorizing formulas.",
            "Estimate first so the final answer can be checked quickly."
          ]
        }
      ]
    },
    {
      id: "secondary-science",
      section: "Secondary Education",
      title: "Secondary Science Basics",
      summary: "Understand matter, force, energy, cells, and the scientific method.",
      level: "Basic secondary",
      topics: [
        {
          heading: "Scientific thinking",
          points: [
            "Science begins with observation, questions, predictions, and testing.",
            "Evidence is stronger than guesses."
          ]
        },
        {
          heading: "Core ideas",
          points: [
            "Matter can change state when heat is added or removed.",
            "Force changes motion, and energy can change from one form to another.",
            "Cells are the basic units of life."
          ]
        }
      ]
    },
    {
      id: "secondary-english",
      section: "Secondary Education",
      title: "Secondary English Communication",
      summary: "Build grammar, comprehension, vocabulary, and better written answers.",
      level: "Basic secondary",
      topics: [
        {
          heading: "Grammar and structure",
          points: [
            "Strong answers use correct tense, punctuation, and sentence order.",
            "Subject and verb should agree clearly."
          ]
        },
        {
          heading: "Comprehension and writing",
          points: [
            "Read questions carefully and answer what is asked.",
            "Use simple and accurate language before trying complex words."
          ]
        }
      ]
    },
    {
      id: "secondary-gk",
      section: "Secondary Education",
      title: "General Knowledge and Social Awareness",
      summary: "Learn about geography, civics, current structures, and everyday awareness.",
      level: "Basic secondary",
      topics: [
        {
          heading: "What to know",
          points: [
            "General knowledge includes countries, capitals, leaders, institutions, science facts, and public life.",
            "Social awareness includes how communities, laws, and public systems work."
          ]
        },
        {
          heading: "Study method",
          points: [
            "Use categories like geography, history, science, and civics instead of random memorization.",
            "Review short fact lists regularly."
          ]
        }
      ]
    },
    {
      id: "junior-maths",
      section: "Junior Secondary Studies",
      title: "Junior Maths and Logic",
      summary: "Move from foundations to multi-step reasoning, formula use, and logic.",
      level: "Junior secondary",
      topics: [
        {
          heading: "Key shift",
          points: [
            "Questions now involve more than one step, so planning matters.",
            "Learners should know when to convert words into equations."
          ]
        },
        {
          heading: "Useful habits",
          points: [
            "Write formulas before using them.",
            "Check units, signs, and rough estimates before final submission."
          ]
        }
      ]
    },
    {
      id: "junior-science",
      section: "Junior Secondary Studies",
      title: "Junior Science Concepts",
      summary: "Stronger notes for biology, physical science, and experimentation.",
      level: "Junior secondary",
      topics: [
        {
          heading: "Biology basics",
          points: [
            "Cells form tissues, tissues form organs, and organs work in systems.",
            "Health topics are easier when linked to real-life body functions."
          ]
        },
        {
          heading: "Physical science",
          points: [
            "Force, motion, heat, light, and electricity explain many daily events.",
            "Diagrams help learners remember processes clearly."
          ]
        }
      ]
    },
    {
      id: "higher-civil",
      section: "Higher Education",
      title: "Civil Services Foundation",
      summary: "Begin with polity, governance, geography, economics, and answer writing.",
      level: "Higher education",
      topics: [
        {
          heading: "Core preparation areas",
          points: [
            "Polity explains the Constitution, government structure, and rights.",
            "Economics explains money flow, growth, inflation, and public finance.",
            "Geography and current affairs connect static knowledge with present events."
          ]
        },
        {
          heading: "Preparation method",
          points: [
            "Read one concept, summarize it, then practice a short answer or MCQ.",
            "Consistency matters more than reading too many sources."
          ]
        }
      ]
    },
    {
      id: "higher-finance",
      section: "Higher Education",
      title: "Finance Basics",
      summary: "Understand saving, investing, risk, return, markets, and business basics.",
      level: "Higher education",
      topics: [
        {
          heading: "Foundations",
          points: [
            "Saving protects money for short-term needs, while investing aims for growth.",
            "Risk and return usually move together.",
            "Diversification reduces dependence on one asset."
          ]
        },
        {
          heading: "Core terms",
          points: [
            "Assets create value, liabilities create obligations, and equity shows ownership.",
            "A balance sheet shows financial position at a point in time."
          ]
        }
      ]
    },
    {
      id: "higher-it",
      section: "Higher Education",
      title: "IT Fundamentals",
      summary: "Cover programming logic, operating systems, databases, and networks from basics.",
      level: "Higher education",
      topics: [
        {
          heading: "Programming and logic",
          points: [
            "Programs follow instructions in sequence, decisions, and repetition.",
            "Debugging means finding where logic or syntax breaks the expected output."
          ]
        },
        {
          heading: "Systems basics",
          points: [
            "Operating systems manage hardware and software resources.",
            "Databases store structured information, and networks move data between devices."
          ]
        }
      ]
    },
    {
      id: "higher-law",
      section: "Higher Education",
      title: "Law Basics",
      summary: "Start with constitutional law, contracts, torts, criminal law, and legal reasoning.",
      level: "Higher education",
      topics: [
        {
          heading: "Major areas",
          points: [
            "Constitutional law explains state power and individual rights.",
            "Contract law deals with valid agreements and obligations.",
            "Tort law covers civil wrongs and remedies."
          ]
        },
        {
          heading: "How to study law",
          points: [
            "Define terms clearly before learning exceptions.",
            "Use examples and case logic to remember principles."
          ]
        }
      ]
    },
    {
      id: "higher-pharma",
      section: "Higher Education",
      title: "Pharmacy and Health Sciences Basics",
      summary: "Learn drug forms, pharmacology, dosage, safety, and patient care concepts.",
      level: "Higher education",
      topics: [
        {
          heading: "Core ideas",
          points: [
            "Pharmacology studies how drugs act in the body.",
            "Pharmaceutics focuses on dosage forms and medicine preparation.",
            "Patient safety depends on correct dose, route, and timing."
          ]
        },
        {
          heading: "Study advice",
          points: [
            "Group medicines by purpose, not only by name.",
            "Link theory with patient-care examples for better recall."
          ]
        }
      ]
    },
    {
      id: "higher-civil-polity",
      section: "Higher Education",
      title: "Civil Services: Polity and Governance",
      summary: "Organized notes on the Constitution, Parliament, executive institutions, and governance basics.",
      level: "Higher education",
      topics: [
        {
          heading: "Constitution and rights",
          points: [
            "The Constitution defines state structure, rights, duties, and legal authority.",
            "Fundamental Rights protect liberty, equality, and freedom in public life.",
            "Directive Principles guide welfare-focused policy making."
          ]
        },
        {
          heading: "Governance structure",
          points: [
            "Parliament makes laws, the executive implements them, and the judiciary interprets them.",
            "Federalism divides powers between central and state governments.",
            "Local bodies improve administration closer to citizens."
          ]
        }
      ]
    },
    {
      id: "higher-civil-economy",
      section: "Higher Education",
      title: "Civil Services: Economy and Development",
      summary: "Simple higher-ed notes on GDP, inflation, banking, taxation, budgeting, and public development.",
      level: "Higher education",
      topics: [
        {
          heading: "Economic basics",
          points: [
            "GDP measures the value of goods and services produced in an economy.",
            "Inflation means a rise in average prices over time.",
            "Fiscal policy uses taxation and public spending to guide growth."
          ]
        },
        {
          heading: "Development view",
          points: [
            "Development is not only income growth but also education, health, and access.",
            "Budgets reveal government priorities in welfare, infrastructure, and reforms.",
            "Current affairs become easier when linked to core economic terms."
          ]
        }
      ]
    },
    {
      id: "higher-finance-accounting",
      section: "Higher Education",
      title: "Finance: Accounting and Reporting",
      summary: "Cover revenue, expenses, assets, liabilities, profit, and basic financial statements.",
      level: "Higher education",
      topics: [
        {
          heading: "Accounting structure",
          points: [
            "Accounting records financial transactions in an organized and verifiable way.",
            "Revenue shows income earned, while expenses show the cost of operations.",
            "Profit is the excess of income over expenses."
          ]
        },
        {
          heading: "Core statements",
          points: [
            "The balance sheet shows financial position at a point in time.",
            "The income statement explains profit over a period.",
            "Cash flow shows how money moves in and out of the business."
          ]
        }
      ]
    },
    {
      id: "higher-finance-investment",
      section: "Higher Education",
      title: "Finance: Investment and Risk Planning",
      summary: "Understand asset classes, portfolio balance, risk appetite, and long-term planning.",
      level: "Higher education",
      topics: [
        {
          heading: "Investment choices",
          points: [
            "Common asset classes include equity, debt, gold, and cash equivalents.",
            "Long-term growth usually needs patience and diversification.",
            "Investment planning should match goals, timeline, and risk tolerance."
          ]
        },
        {
          heading: "Risk management",
          points: [
            "Higher return opportunities usually carry higher uncertainty.",
            "Diversification lowers overdependence on one investment.",
            "Reviewing allocation regularly helps keep the portfolio aligned with goals."
          ]
        }
      ]
    },
    {
      id: "higher-it-programming",
      section: "Higher Education",
      title: "IT: Programming and Data Structures",
      summary: "Clear notes on coding logic, algorithms, arrays, linked lists, stacks, queues, and practice habits.",
      level: "Higher education",
      topics: [
        {
          heading: "Programming logic",
          points: [
            "Programs solve problems through sequence, condition checks, loops, and functions.",
            "Good code is readable, testable, and broken into small reusable parts.",
            "Tracing input and output is one of the fastest ways to debug."
          ]
        },
        {
          heading: "Data structures",
          points: [
            "Arrays store ordered values with index-based access.",
            "Stacks follow last in, first out and queues follow first in, first out.",
            "Choosing the right structure improves performance and code clarity."
          ]
        }
      ]
    },
    {
      id: "higher-it-database-networking",
      section: "Higher Education",
      title: "IT: Databases and Networking",
      summary: "Organized notes on tables, keys, queries, normalization, protocols, and data transfer basics.",
      level: "Higher education",
      topics: [
        {
          heading: "Database essentials",
          points: [
            "Tables store structured records, and keys connect related data.",
            "Normalization reduces duplication and improves consistency.",
            "SQL is used to query, insert, update, and manage structured data."
          ]
        },
        {
          heading: "Networking essentials",
          points: [
            "Networks connect devices so they can share data and services.",
            "Protocols define how communication happens between systems.",
            "IP addresses help identify devices and route information."
          ]
        }
      ]
    },
    {
      id: "higher-law-constitutional",
      section: "Higher Education",
      title: "Law: Constitutional and Administrative Basics",
      summary: "Learn separation of powers, judicial review, administrative fairness, and public authority control.",
      level: "Higher education",
      topics: [
        {
          heading: "Constitutional focus",
          points: [
            "Constitutional law limits state power and protects public rights.",
            "Judicial review checks whether laws and actions follow constitutional principles.",
            "Separation of powers prevents concentration of authority."
          ]
        },
        {
          heading: "Administrative focus",
          points: [
            "Administrative law examines how public authorities make and apply decisions.",
            "Fair procedure and reasoned decisions are important legal standards.",
            "Remedies help control misuse of public power."
          ]
        }
      ]
    },
    {
      id: "higher-law-criminal",
      section: "Higher Education",
      title: "Law: Criminal Law and Evidence",
      summary: "Structured notes on offence basics, intent, procedure, burden of proof, and evidence use.",
      level: "Higher education",
      topics: [
        {
          heading: "Criminal law basics",
          points: [
            "A criminal offence usually requires both a wrongful act and a guilty mind.",
            "Punishment aims at accountability, deterrence, and social order.",
            "Legal definitions matter because similar acts may carry different consequences."
          ]
        },
        {
          heading: "Evidence and proof",
          points: [
            "Evidence law explains what can be presented and how it is evaluated.",
            "Burden of proof is central in criminal trials.",
            "Facts, witnesses, documents, and material objects all need legal reliability."
          ]
        }
      ]
    },
    {
      id: "higher-pharma-pharmacology",
      section: "Higher Education",
      title: "Pharmacy: Pharmacology and Therapeutics",
      summary: "Organized notes on drug action, dosage, adverse effects, interactions, and patient safety.",
      level: "Higher education",
      topics: [
        {
          heading: "Drug action",
          points: [
            "Pharmacodynamics explains what a drug does to the body.",
            "Pharmacokinetics explains absorption, distribution, metabolism, and excretion.",
            "Dose-response understanding supports safe and effective use."
          ]
        },
        {
          heading: "Therapeutic use",
          points: [
            "Drug choice depends on condition, age, history, and safety profile.",
            "Interactions and side effects must be checked before administration.",
            "Patient counselling improves adherence and reduces misuse."
          ]
        }
      ]
    },
    {
      id: "higher-pharma-pharmaceutics",
      section: "Higher Education",
      title: "Pharmacy: Pharmaceutics and Dosage Forms",
      summary: "Cover tablets, capsules, liquids, sterile products, stability, storage, and dispensing basics.",
      level: "Higher education",
      topics: [
        {
          heading: "Dosage forms",
          points: [
            "Different dosage forms improve convenience, stability, or route-specific delivery.",
            "Tablets, capsules, syrups, and injections each serve different needs.",
            "Formulation affects absorption and patient use."
          ]
        },
        {
          heading: "Storage and quality",
          points: [
            "Temperature, light, moisture, and contamination affect medicine quality.",
            "Labelling and storage instructions are part of safe dispensing.",
            "Pharmaceutics connects preparation quality with therapeutic effectiveness."
          ]
        }
      ]
    },
    {
      id: "coding-career",
      section: "Career and Digital Skills",
      title: "Coding and Career Growth",
      summary: "Learn project habits, communication, portfolios, and continuous improvement.",
      level: "All learners",
      topics: [
        {
          heading: "Coding growth",
          points: [
            "Small working projects teach more than unfinished large ideas.",
            "Version control, testing, and debugging are practical professional skills."
          ]
        },
        {
          heading: "Career growth",
          points: [
            "Build a record of work through notes, projects, scores, and reflection.",
            "Choose one skill to improve consistently instead of trying everything at once."
          ]
        }
      ]
    }
  ];

  window.EduFunNotesLibrary = notesLibrary;
})();
