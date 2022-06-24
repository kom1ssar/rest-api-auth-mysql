import * as fs from 'fs';
import path from 'path';

export function fileDeleteStrategy(delFile: string): void {
	const pathFile = path.resolve(__dirname, '..', '..', 'public', 'photo', delFile);
	fs.unlink(pathFile, (err) => {
		if (err) {
			console.log('Не найден файл');
		} else {
			console.log('Файл удалён');
		}
	});
}
