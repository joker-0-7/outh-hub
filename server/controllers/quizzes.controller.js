const examModel = require("../models/exam.model");
const PastPapers = require("../models/pastPapers.model");
const QuizUsers = require("../models/quiz.model");

const getQuizzes = async (req, res) => {
  const current = req.params.current || 1;
  const perPage = 10;
  try {
    const quizzes = await examModel
      .find()
      .skip((current - 1) * perPage)
      .limit(perPage)
      .lean();
    return res.status(200).json(quizzes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const getQuestionsCount = async (req, res) => {
  try {
    const count = await examModel.countDocuments();
    console.log("Total Questions Count:", count);
    return res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching questions count:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const addQuiz = async (req, res) => {
  const data = req.body;
  data.image = req.uniqueSuffix || "";
  console.log(data);
  const quiz = await examModel({
    sources: JSON.parse(data.sources),
    question: data.question,
    answers: JSON.parse(data.answers),
    pastPapers: JSON.parse(data.pastPapers),
    correct: data.correct,
    explanation: data.explanation,
    subjects: JSON.parse(data.subjects),
    image: data.image,
  });
  try {
    quiz.save();
    console.log(quiz);
    return res.status(201).json({ msg: "Done Create Exam" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const getQuestion = async (req, res) => {
  const id = req.params.id;
  try {
    const question = await examModel.findById(id);
    return res.status(201).json(question);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const deleteQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    await examModel.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Done Delete Question" });
  } catch (err) {
    console.log(err);
  }
};
const updateQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await examModel.findByIdAndUpdate(id, {
      sources: JSON.parse(data.sources),
      question: data.question,
      answers: JSON.parse(data.answers),
      correct: data.correct,
      explanation: data.explanation,
      subjects: JSON.parse(data.subjects),
    });
    return res.status(200).json({ msg: "Done Update Question" });
  } catch (err) {
    console.log(err);
  }
};
//! I Will Update It (Important) Because Docs Will Be Not Work
const addQuizUsers = async (req, res) => {
  const data = req.body.data;
  const id = req.current.userId;
  const existQuiz = await QuizUsers.findOne({ studentId: id });
  let answeredQuestions = [];
  // if (existQuiz) {
  //   const id = existQuiz._id;
  //   if (!data.adv) {
  //     answeredQuestions = existQuiz.question.map((qId) => qId.questionId);
  //   } else {
  //     if (data.useAndCorrect) {
  //       answeredQuestions = existQuiz.question
  //         .filter((qId) => qId.value === "true")
  //         .map((qId) => qId.questionId);
  //     } else {
  //       answeredQuestions = existQuiz.question
  //         .filter((qId) => qId.value === "false")
  //         .map((qId) => qId.questionId);
  //     }
  //   }
  //   try {
  //     await QuizUsers.findByIdAndUpdate(id, {
  //       $push: { question: data.question },
  //       subjects: data.subjects,
  //       sources: data.sources,
  //       mode: data.mode,
  //     });
  //     if (data.adv) {
  //       if (answeredQuestions.length < 1)
  //         return res
  //           .status(404)
  //           .json({ msg: "You don't have questions", exam: [] });
  //       const exam = await examModel.aggregate([
  //         {
  //           $match: {
  //             sources: { $in: data.sources },
  //             subjects: { $in: data.subjects },
  //             _id: { $in: answeredQuestions },
  //           },
  //         },
  //         { $sample: { size: data.count || 100 } },
  //       ]);
  //       return res
  //         .status(201)
  //         .json({ msg: "Done Updated Documentation", exam });
  //     } else {
  //       const exam = await examModel.aggregate([
  //         {
  //           $match: {
  //             sources: { $in: data.sources },
  //             subjects: { $in: data.subjects },
  //             _id: { $nin: answeredQuestions },
  //           },
  //         },
  //         { $sample: { size: data.count || 100 } },
  //       ]);
  //       return res
  //         .status(201)
  //         .json({ msg: "Done Updated Documentation", exam });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // } else {
  //   try {
  //     const quiz = await .QuizUserscreate({
  //       studentId: req.current.userId,
  //       sources: data.sources,
  //       subjects: data.subjects,
  //       mode: data.mode,
  //     });
  //     return res.status(201).json({ msg: "Done Create Exam", quiz });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({
  //       message: "Internal server error",
  //     });
  //   }
  // }
  if (!data.useAndInCorrect && !data.useAndCorrect) {
    if (existQuiz) {
      answeredQuestions = existQuiz.question.map((qId) => qId.questionId);
    }
    await QuizUsers.findByIdAndUpdate(id, {
      $push: { question: data.question },
      subjects: data.subjects,
      sources: data.sources,
      mode: data.mode,
    });
    const exam = await examModel.aggregate([
      {
        $match: {
          sources: { $in: data.sources },
          subjects: { $in: data.subjects },
          _id: { $nin: answeredQuestions },
        },
      },
      { $sample: { size: data.count || 100 } },
    ]);
    return res.status(201).json({ msg: "Done Updated Documentation", exam });
  } else if (data.useAndInCorrect && !data.useAndCorrect) {
    if (existQuiz) {
      answeredQuestions = existQuiz.question
        .filter((qId) => qId.value === "false")
        .map((qId) => qId.questionId);
    }
    await QuizUsers.findByIdAndUpdate(id, {
      $push: { question: data.question },
      subjects: data.subjects,
      sources: data.sources,
      mode: data.mode,
    });
    const exam = await examModel.aggregate([
      {
        $match: {
          sources: { $in: data.sources },
          subjects: { $in: data.subjects },
          _id: { $in: answeredQuestions },
        },
      },
      { $sample: { size: data.count || 100 } },
    ]);
    return res.status(201).json({ msg: "Done Updated Documentation", exam });
  } else if (data.useAndCorrect && !data.useAndInCorrect) {
    if (existQuiz) {
      answeredQuestions = existQuiz.question
        .filter((qId) => qId.value === "true")
        .map((qId) => qId.questionId);
    }
    await QuizUsers.findByIdAndUpdate(id, {
      $push: { question: data.question },
      subjects: data.subjects,
      sources: data.sources,
      mode: data.mode,
    });
    const exam = await examModel.aggregate([
      {
        $match: {
          sources: { $in: data.sources },
          subjects: { $in: data.subjects },
          _id: { $in: answeredQuestions },
        },
      },
      { $sample: { size: data.count || 100 } },
    ]);
    return res.status(201).json({ msg: "Done Updated Documentation", exam });
  } else {
    if (existQuiz) {
      answeredQuestions = existQuiz.question
        .filter((qId) => qId.value === "true" || qId.value === "false")
        .map((qId) => qId.questionId);
    }
    await QuizUsers.findByIdAndUpdate(id, {
      $push: { question: data.question },
      subjects: data.subjects,
      sources: data.sources,
      mode: data.mode,
    });
    const exam = await examModel.aggregate([
      {
        $match: {
          sources: { $in: data.sources },
          subjects: { $in: data.subjects },
          _id: { $in: answeredQuestions },
        },
      },
      { $sample: { size: data.count || 100 } },
    ]);
    return res.status(201).json({ msg: "Done Updated Documentation", exam });
  }
  return res.status(404);
};
const getQuizUsers = async (req, res) => {
  try {
    const quiz = await QuizUsers.find().populate({
      path: "studentId",
      select: "firstName lastName",
    });
    return res.status(201).json(quiz);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const addQuizToUser = async (req, res) => {
  const data = req.body.data;
  const id = req.current.userId;
  try {
    const existQuiz = await QuizUsers.exists({ studentId: id });
    const questionsToAdd = Object.entries(data).map(
      ([questionId, value, answerUser]) => ({ questionId, value, answerUser })
    );
    if (existQuiz) {
      const quiz = await QuizUsers.findByIdAndUpdate(
        existQuiz._id,
        { $push: { question: { $each: questionsToAdd } } },
        { new: true }
      );
      return res.status(201).json({ msg: "Done Create Exam", quiz });
    } else {
      const quiz = await QuizUsers.create({
        studentId: id,
        question: questionsToAdd,
      });
      return res.status(201).json({ msg: "Done Create Exam", quiz });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const getQuizzesUser = async (req, res) => {
  if (req.current?.type === "free") return res.status(200).json({ quiz: [] });
  try {
    const quiz = await QuizUsers.find({
      studentId: req.current.userId,
    }).populate({
      path: "question.questionId",
      select: "question answers correct sources",
    });
    return res.status(201).json(quiz);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
// const getQuizzesUser = async (req, res) => {
//   try {
//     const current = req.params.current || 1;
//     const perPage = 10;
//     const studentId = req.current.userId;

//     const totalQuizzes = await QuizUsers.countDocuments({ studentId });

//     const quizzes = await QuizUsers.find({ studentId })
//       .limit(perPage)
//       .skip((current - 1) * perPage)
//       .populate({
//         path: "question.questionId",
//         select: "question answers correct sources",
//       })
//       .exec();

//     const paginatedQuizzes = quizzes.map((quiz) => {
//       const totalQuestions = quiz.question.length;
//       const paginatedQuestions = quiz.question.slice(
//         (current - 1) * perPage,
//         current * perPage
//       );
//       return {
//         ...quiz.toObject(),
//         question: paginatedQuestions,
//         totalQuestions,
//         totalQuestionPages: Math.ceil(totalQuestions / perPage),
//         currentQuestionPage: current,
//       };
//     });
//     console.log(paginatedQuizzes);
//     return res.status(201).json({
//       quizzes: paginatedQuizzes,
//       totalQuizzes,
//       totalPages: Math.ceil(totalQuizzes / perPage),
//       currentPage: current,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };
const getPreviousQuestions = async (req, res) => {
  try {
    const { page, limit, questionPage, questionLimit } = req.query;
    const studentId = req.current.userId;
    const totalQuizzes = await QuizUsers.countDocuments({ studentId });

    const quizzes = await QuizUsers.find({ studentId })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate({
        path: "question.questionId",
        select: "question answers correct sources",
      })
      .exec();

    const paginatedQuizzes = quizzes.map((quiz) => {
      const totalQuestions = quiz.question.length;
      const paginatedQuestions = quiz.question.slice(
        (questionPage - 1) * questionLimit,
        questionPage * questionLimit
      );
      return {
        ...quiz.toObject(),
        question: paginatedQuestions,
        totalQuestions,
        totalQuestionPages: Math.ceil(totalQuestions / questionLimit),
        currentQuestionPage: questionPage,
      };
    });

    return res.status(201).json({
      quizzes: paginatedQuizzes,
      totalQuizzes,
      totalPages: Math.ceil(totalQuizzes / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const addPastPapers = async (req, res) => {
  const data = req.body.data;
  try {
    const pastPaper = await PastPapers.create(data);
    return res.status(201).json({ msg: "Done Created Exam" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const getPastPapers = async (req, res) => {
  try {
    const pastPapera = await PastPapers.find({}, { data: 0 });
    return res.status(200).json(pastPapera);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const getPastPaper = async (req, res) => {
  const data = req.params.id;
  console.log(data);
  try {
    const pastPaper = await examModel.aggregate([
      {
        $match: {
          pastPapers: data,
        },
      },
    ]);
    console.log(pastPaper);
    return res.status(200).json(pastPaper);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = {
  getQuizzes,
  addQuiz,
  addQuizUsers,
  getQuizUsers,
  addQuizToUser,
  getQuizzesUser,
  addPastPapers,
  getPastPapers,
  getPastPaper,
  deleteQuestion,
  getQuestion,
  updateQuestion,
  getQuestionsCount,
  getPreviousQuestions,
};
