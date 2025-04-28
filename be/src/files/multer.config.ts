import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  getRootPath = () => process.cwd();

  ensureExistsSync = (targetDirectory: string) => {
    if (!fs.existsSync(targetDirectory)) {
      fs.mkdirSync(targetDirectory, { recursive: true });
      console.log('Directory created:', targetDirectory);
    }
  };

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const folder = req?.headers?.folder_type ?? 'default';
          this.ensureExistsSync(`public/images/${folder}`);
          cb(null, path.join(this.getRootPath(), `public/images/${folder}`));
        },
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const base = path.basename(file.originalname, ext);
          const fileName = `${base}-${Date.now()}${ext}`;
          cb(null, fileName);
        },
      }),
    };
  }
}
