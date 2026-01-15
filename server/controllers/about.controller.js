import About from "../models/About.js";

/* ---------- Get About Data ---------- */
export const getAboutData = async (req, res) => {
    try {
        const about = await About.findOne().lean();

        if (!about) {
            return res.status(200).json({
                success: true,
                data: {
                    content: "",
                    highlights: []
                }
            });
        }

        return res.status(200).json({
            success: true,
            data: about
        });
    } catch (error) {
        console.error("Get About Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch about data"
        });
    }
};
/* ---------- Update About Data ---------- */
export const updateAboutData = async (req, res) => {
    try {
        const { content, highlights } = req.body;

        /* ---- Validation ---- */
        if (!content || typeof content !== "string") {
            return res.status(400).json({
                success: false,
                message: "Valid content text is required"
            });
        }

        if (highlights && !Array.isArray(highlights)) {
            return res.status(400).json({
                success: false,
                message: "Highlights must be an array"
            });
        }

        /* ---- Validate highlight objects ---- */
        if (Array.isArray(highlights)) {
            for (const item of highlights) {
                if (!item.word || !item.color) {
                    return res.status(400).json({
                        success: false,
                        message: "Each highlight must have word and color"
                    });
                }
            }
        }

        const updatedAbout = await About.findOneAndUpdate(
            {},
            {
                content,
                highlights: highlights || []
            },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "About section updated successfully",
            data: updatedAbout
        });
    } catch (error) {
        console.error("Update About Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to update about data"
        });
    }
};
