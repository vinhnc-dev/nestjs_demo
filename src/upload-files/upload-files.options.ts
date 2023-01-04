import { diskStorage } from "multer";

export const option = {
    storage: diskStorage({
        destination: process.env.DESTINATION,
        filename: (request, file, callback) => {
          const currentTime = new Date().getTime();
          const type = file.mimetype.split('/');
          const filename = `${currentTime}-avatar.${type[1]}`;
          callback(null, filename);
        },
      }),
}