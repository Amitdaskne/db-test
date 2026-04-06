export default async function handler(req, res) {
    const { key } = req.query; // Game se aayi key: ?key=123
    const TOKEN = "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"; // Aapka Token

    try {
        // GitHub se keys mangwao
        const response = await fetch("https://api.github.com/repos/Amitdaskne/db-test/contents/keys.json", {
            headers: { Authorization: `token ${TOKEN}` }
        });
        const data = await response.json();
        const keys = JSON.parse(Buffer.from(data.content, 'base64').toString());

        // Key find karo
        const found = keys.find(k => k.key === key);

        if (!found) return res.status(401).json({ status: "INVALID" });
        if (found.status === "EXPIRED") return res.status(403).json({ status: "EXPIRED" });

        // Success Response
        res.status(200).json({ status: "SUCCESS", duration: found.duration });
    } catch (err) {
        res.status(500).json({ status: "SERVER_ERROR" });
    }
}
