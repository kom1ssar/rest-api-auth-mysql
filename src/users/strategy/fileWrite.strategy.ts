import fileUpload from 'express-fileupload';
import { extname } from 'path';
import * as uuid from 'uuid';
import path from 'path';

export async function fileWriteStrategy(img: fileUpload.UploadedFile): Promise<string | null> {
	if (
		extname(img.name) !== '.png' &&
		extname(img.name) !== '.jpg' &&
		extname(img.name) !== '.gif' &&
		extname(img.name) !== '.jpeg'
	) {
		return null;
	}
	const fileName = uuid.v4() + extname(img.name);
	await img.mv(path.resolve(__dirname, '..', '..', 'public', 'photo', fileName));
	return fileName;
}
