import { diskStorage } from 'multer';

export const optionAvatars = {
  storage: diskStorage({
    destination: process.env.DESTINATION_AVATARS,
    filename: (request, file, callback) => {
      const currentTime = new Date().getTime();
      const type = file.mimetype.split('/');
      const filename = `${currentTime}-avatar.${type[1]}`;
      callback(null, filename);
    },
  }),
};

export const optionImages = {
  storage: diskStorage({
    destination: process.env.DESTINATION_IMAGES,
    filename: (request, file, callback) => {
      const currentTime = new Date().getTime();
      const type = file.mimetype.split('/');
      const filename = `${currentTime}-image.${type[1]}`;
      callback(null, filename);
    },
  }),
};
