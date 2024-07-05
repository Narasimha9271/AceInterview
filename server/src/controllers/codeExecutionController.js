const axios = require("axios");

const executeCode = async (req, res) => {
    const { source_code, language_id, stdin } = req.body;

    try {
        const response = await axios.post(
            "https://api.judge0.com/submissions",
            {
                source_code,
                language_id,
                stdin,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const { token } = response.data;

        const resultResponse = await axios.get(
            `https://api.judge0.com/submissions/${token}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        res.status(200).json(resultResponse.data);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { executeCode };
