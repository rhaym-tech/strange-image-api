import { Request, Response } from "express";
import { Denoise } from "discord-image-generation";
import ResponseUtil from "../../utils/ResponseUtil";

/**
 * @swagger
 * /utils/denoise:
 *   get:
 *     summary: Denoise an image
 *     tags: [Utils]
 *     parameters:
 *       - in: query
 *         name: image
 *         description: The image url
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The buffer containing the image data
 *         image/png:
 *           schema:
 *             type: binary
 */

export default async (req: Request, res: Response): Promise<any> => {
    try {
        const { code } = req.query;
        if (!code) return ResponseUtil.missingParams(res, "code");
        const buffer = await new Denoise().getImage(code as string);
        return ResponseUtil.success(res, buffer);
    } catch (ex) {
        return ResponseUtil.serverError(res, ex as Error);
    }
};
