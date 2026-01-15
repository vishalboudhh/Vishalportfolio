import Home from "../models/Home.js";

/* ---------- Get Home Data (Public) ---------- */
export const getHomeData = async (req, res) => {
    try {
        const home = await Home.findOne().lean();

        /* If not created yet, return empty object */
        if (!home) {
            return res.status(200).json({
                success: true,
                data: {
                    linkedin: "",
                    github: "",
                    leetcode: "",
                    gfg: "",
                    resumeUrl: ""
                }
            });
        }

        return res.status(200).json({
            success: true,
            data: home
        });
    } catch (error) {
        console.error("Get Home Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch home data"
        });
    }
};

/* ---------- Update Home Data (Admin) ---------- */
export const updateHomeData = async (req, res) => {
    try {
        const {
            linkedin,
            github,
            leetcode,
            gfg,
            resumeUrl
        } = req.body;

        /* ---- Basic validation ---- */
        if (
            !linkedin &&
            !github &&
            !leetcode &&
            !gfg &&
            !resumeUrl
        ) {
            return res.status(400).json({
                success: false,
                message: "At least one field is required"
            });
        }

        /* ---- Update or create ---- */
        const updatedHome = await Home.findOneAndUpdate(
            {},
            {
                linkedin,
                github,
                leetcode,
                gfg,
                resumeUrl
            },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Home data updated successfully",
            data: updatedHome
        });
    } catch (error) {
        console.error("Update Home Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to update home data"
        });
    }
};
