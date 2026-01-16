const LikeService = require('../services/like-service');
const likeService = new LikeService();

const toggleLike = async (req, res) => {
    try {
        const { modelId, modelType } = req.query;   
        const { userId } = req.body; 

        const result = await likeService.toggleLike(
            modelId,
            modelType,
            userId
        );

        return res.status(200).json({
            success: true,
            message : 'Successfully toggled the like',
            data: result
        });
    } catch (error) {
        console.error('LIKE ERROR:', error); // 👈 MUST ADD
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

module.exports = {
    toggleLike
};
