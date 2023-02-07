const File = require('../model/fileModel');
const multer = require('multer');

const multerStorage = multer.diskStorage({
  // file : Current uploaded file, cb : it is like next()
  destination: (req, file, cb) => {
    cb(null, 'public/img/files');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${Date.now()}.${ext}`);
  },
});

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image' || 'text')) cb(null, true);
//   else cb(new Error('File upload failed.'), false);
// };

const upload = multer({
  storage: multerStorage,
  // fileFilter: multerFilter,
});

exports.uploadFile = upload.single('file');

// exports.downloadFile = async (req, res, next) => {
//   try {
//   } catch (err) {
//     res.status(404).json({
//       message: 'fail',
//       error: `Documents fetch failed.`,
//     });
//   }
// };

exports.getAllSendRequests = async (req, res, next) => {
  try {
    const documents = await File.find();

    res.status(200).json({
      message: 'success',
      results: documents.length,
      data: documents,
    });
  } catch (err) {
    res.status(404).json({
      message: 'fail',
      error: `Documents fetch failed.`,
    });
  }

  next();
};

exports.createSendRequest = async (req, res, next) => {
  try {
    const sendDocument = await File.create(req.body);

    res.status(200).json({
      message: 'success',
      data: sendDocument,
    });
  } catch (err) {
    res.status(404).json({
      message: 'fail',
      error: `Document creation failed.`,
    });
  }

  next();
};

exports.updateSendRequest = async (req, res, next) => {
  try {
    const updateDocument = await File.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateDocument) {
      res.status(404).json({
        status: 'success',
        message: `No document found with id ${req.params.id}`,
      });
    }

    res.status(204).json({
      status: 'success',
      data: updateDocument,
    });
  } catch (err) {
    res.status(404).json({
      message: 'fail',
      error: `Document update failed.`,
    });
  }

  next();
};

exports.deleteSendRequest = async (req, res, next) => {
  try {
    const deleteDocument = await File.findByIdAndDelete(req.params.id);

    if (!deleteDocument) {
      res.status(404).json({
        status: 'success',
        message: `No document found with id ${req.params.id}`,
      });
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      message: 'fail',
      error: `Document deletion failed.`,
    });
  }

  next();
};

exports.getSendRequest = async (req, res, next) => {
  try {
    const document = await File.findById(req.params.id);

    if (!document) {
      res.status(404).json({
        status: 'success',
        message: `No document found with id ${req.params.id}`,
      });
    }

    res.status(200).json({
      status: 'success',
      data: document,
    });
  } catch (err) {
    res.status(404).json({
      message: 'fail',
      error: 'Document fetch failed.',
    });
  }
};
