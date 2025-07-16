import axios from "axios";

export const getJudge0LanguageId = (language) => {
  const languageMap = {
    PYTHON: 71,
    JAVA: 62,
    JAVASCRIPT: 63,
    TYPESCRIPT: 74,
  };
  return languageMap[language.toUpperCase()];
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const judge0Headers = {
  "x-rapidapi-key": process.env.JUDGE0_RAPIDAPI_KEY,
  "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
};

export const pollBatchResults = async (tokens) => {
  while (true) {
    const { data } = await axios.get(`${process.env.TEST}/submissions/batch`, {
      params: {
        tokens: tokens.join(","),
        base64_encoded: false,
      },
      // headers: judge0Headers,
    });

    const results = data.submissions;

    const isAllDone = results.every(
      (r) => r.status.id !== 1 && r.status.id !== 2
    );

    if (isAllDone) return results;
    await sleep(1000);
  }
};

export const submitBatch = async (submissions) => {
  const { data } = await axios.post(
    `${process.env.TEST}/submissions/batch?base64_encoded=false`,
    {
      submissions,
    }
    // {
    // headers: judge0Headers,
    // }
  );
  console.log("Submission results:", data);
  return data; //[{token},{token},{token}]
};

export function getLanguageName(languageId) {
  const LANGUAGE_NAMES = {
    74: "TypeScript",
    63: "JavaScript",
    71: "Python",
    62: "Java",
  };

  return LANGUAGE_NAMES[languageId] || "Unknown";
}
