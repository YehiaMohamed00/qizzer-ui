"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sun, Moon, Clock, RefreshCcw, ChevronLeft, ChevronRight } from "lucide-react"

const quizData = {
  "Quizzes": [
    {
      "Version": "1",
      "Name": "Basic Data Science Quiz - Version 1",
      "Module": "Data Science Fundamentals",
      "Total Points": 100,
      "Number Attempts Allowed": 3,
      "Time Allowed": 30,
      "preventBackNavigation": false,
      "Questions": [
        {
          "Question Text": "What does 'EDA' stand for in data science?",
          "Question Difficulty Level": 1,
          "Question Type": "Single Answer",
          "Options": {
            "a": "Exploratory Data Analytics",
            "b": "Exploratory Data Analysis",
            "c": "Estimated Data Acquisition",
            "d": "Enhanced Data Architecture"
          },
          "Answer": "b",
          "Explanation": "EDA stands for Exploratory Data Analysis, used to summarize data characteristics.",
          "Points": 10
        },
        {
          "Question Text": "Which Python libraries are primarily used for data manipulation? (Select all that apply)",
          "Question Difficulty Level": 1,
          "Question Type": "Multiple Answer",
          "Options": {
            "a": "Pandas",
            "b": "NumPy",
            "c": "Seaborn",
            "d": "Requests"
          },
          "Answer": ["a", "b"],
          "Explanation": "Pandas and NumPy are primarily used for data manipulation.",
          "Points": 10
        },
        {
          "Question Text": "What is the purpose of a confusion matrix?",
          "Question Difficulty Level": 2,
          "Question Type": "Single Answer",
          "Options": {
            "a": "To visualize data distributions",
            "b": "To evaluate classification model performance",
            "c": "To reduce data dimensionality",
            "d": "To perform feature selection"
          },
          "Answer": "b",
          "Explanation": "A confusion matrix shows true vs. predicted values to assess classification.",
          "Points": 10
        },
        {
          "Question Text": "Which algorithms are types of supervised learning? (Select all that apply)",
          "Question Difficulty Level": 2,
          "Question Type": "Multiple Answer",
          "Options": {
            "a": "Linear Regression",
            "b": "K-Means Clustering",
            "c": "Decision Trees",
            "d": "t-SNE"
          },
          "Answer": ["a", "c"],
          "Explanation": "Linear Regression and Decision Trees are supervised learning methods.",
          "Points": 10
        }
      ]
    },
    {
      "Version": "2",
      "Name": "Basic Data Science Quiz - Version 2",
      "Module": "Data Science Fundamentals",
      "Total Points": 100,
      "Number Attempts Allowed": 3,
      "Time Allowed": 10,
      "preventBackNavigation": true,
      "Questions": [
        {
          "Question Text": "In data science, what is meant by 'EDA'?",
          "Question Difficulty Level": 1,
          "Question Type": "Single Answer",
          "Options": {
            "a": "Exploratory Data Acquisition",
            "b": "Exploratory Data Analysis",
            "c": "Enhanced Data Analytics",
            "d": "Enhanced Data Architecture"
          },
          "Answer": "b",
          "Explanation": "EDA, or Exploratory Data Analysis, involves understanding data through summary statistics and visualization.",
          "Points": 10
        },
        {
          "Question Text": "Which of these Python libraries are used for handling data? (Select all that apply)",
          "Question Difficulty Level": 1,
          "Question Type": "Multiple Answer",
          "Options": {
            "a": "Pandas",
            "b": "NumPy",
            "c": "Matplotlib",
            "d": "BeautifulSoup"
          },
          "Answer": ["a", "b"],
          "Explanation": "Pandas and NumPy are essential for data manipulation.",
          "Points": 10
        },
        {
          "Question Text": "What does a confusion matrix help with in machine learning?",
          "Question Difficulty Level": 2,
          "Question Type": "Single Answer",
          "Options": {
            "a": "Reducing data dimensionality",
            "b": "Evaluating model predictions",
            "c": "Feature extraction",
            "d": "Optimizing hyperparameters"
          },
          "Answer": "b",
          "Explanation": "A confusion matrix is a tool to visualize classification results.",
          "Points": 10
        },
        {
          "Question Text": "Identify supervised learning techniques. (Select all that apply)",
          "Question Difficulty Level": 2,
          "Question Type": "Multiple Answer",
          "Options": {
            "a": "Logistic Regression",
            "b": "K-Means Clustering",
            "c": "Random Forest",
            "d": "t-SNE"
          },
          "Answer": ["a", "c"],
          "Explanation": "Logistic Regression and Random Forest are supervised learning algorithms.",
          "Points": 10
        }
      ]
    },
    {
      "Version": "3",
      "Name": "Basic Data Science Quiz - Version 3",
      "Module": "Data Science Fundamentals",
      "Total Points": 100,
      "Number Attempts Allowed": 3,
      "Time Allowed": 60,
      "preventBackNavigation": true,
      "Questions": [
        {
          "Question Text": "What is the full form of 'EDA'?",
          "Question Difficulty Level": 1,
          "Question Type": "Single Answer",
          "Options": {
            "a": "Estimated Data Analysis",
            "b": "Exploratory Data Analysis",
            "c": "Enhanced Data Acquisition",
            "d": "Exploratory Data Acquisition"
          },
          "Answer": "b",
          "Explanation": "EDA, or Exploratory Data Analysis, is used to examine data through summary statistics and visual tools.",
          "Points": 10
        },
        {
          "Question Text": "Which libraries are used in Python for data processing? (Select all that apply)",
          "Question Difficulty Level": 1,
          "Question Type": "Multiple Answer",
          "Options": {
            "a": "NumPy",
            "b": "Requests",
            "c": "Pandas",
            "d": "Django"
          },
          "Answer": ["a", "c"],
          "Explanation": "NumPy and Pandas are widely used for data processing.",
          "Points": 10
        },
        {
          "Question Text": "What is the purpose of a confusion matrix in classification?",
          "Question Difficulty Level": 2,
          "Question Type": "Single Answer",
          "Options": {
            "a": "Performing dimensionality reduction",
            "b": "Comparing true and predicted values",
            "c": "Data normalization",
            "d": "Hyperparameter tuning"
          },
          "Answer": "b",
          "Explanation": "A confusion matrix compares actual and predicted values to assess model accuracy.",
          "Points": 10
        },
        {
          "Question Text": "Which algorithms below are supervised learning methods? (Select all that apply)",
          "Question Difficulty Level": 2,
          "Question Type": "Multiple Answer",
          "Options": {
            "a": "Decision Trees",
            "b": "K-Means Clustering",
            "c": "SVM",
            "d": "t-SNE"
          },
          "Answer": ["a", "c"],
          "Explanation": "Decision Trees and Support Vector Machines (SVM) are supervised methods.",
          "Points": 10
        }
      ]
    }
  ]
}

interface Question {
  Question: string;
  Answer: string[];
  Options: string[];
  // ... other properties
}

type UserAnswers = {
  [quizVersion: string]: {
    [questionIndex: number]: string | string[];
  };
};

export function EnhancedDataScienceQuiz() {
  const [selectedQuizVersion, setSelectedQuizVersion] = useState("1")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({})
  const [questions, setQuestions] = useState<Question[]>([])
  const [timeRemaining, setTimeRemaining] = useState(quizData.Quizzes[0]["Time Allowed"] * 60)
  const [attemptsLeft, setAttemptsLeft] = useState(quizData.Quizzes[0]["Number Attempts Allowed"])
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const [unansweredCount, setUnansweredCount] = useState(0)
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [showBackNavigationWarning, setShowBackNavigationWarning] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentQuiz = quizData.Quizzes.find(quiz => quiz.Version === selectedQuizVersion) || quizData.Quizzes[0]
  const currentQuestion = currentQuiz.Questions[currentQuestionIndex]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Load saved progress from session storage
    const savedProgress = sessionStorage.getItem('quizProgress')
    if (savedProgress) {
      const { answers, questionIndex, remainingTime, attempts, version } = JSON.parse(savedProgress)
      setUserAnswers(answers)
      setCurrentQuestionIndex(questionIndex)
      setTimeRemaining(remainingTime)
      setAttemptsLeft(attempts)
      setSelectedQuizVersion(version)
    }
  }, [])

  useEffect(() => {
    // Save progress to session storage
    sessionStorage.setItem('quizProgress', JSON.stringify({
      answers: userAnswers,
      questionIndex: currentQuestionIndex,
      remainingTime: timeRemaining,
      attempts: attemptsLeft,
      version: selectedQuizVersion
    }))
  }, [userAnswers, currentQuestionIndex, timeRemaining, attemptsLeft, selectedQuizVersion])

  useEffect(() => {
    // Update timer when quiz version changes
    setTimeRemaining(currentQuiz["Time Allowed"] * 60)
  }, [selectedQuizVersion])

  const handleAnswer = (answer: string | string[]) => {
    setUserAnswers((prev) => ({
      ...prev,
      [selectedQuizVersion]: {
        ...prev[selectedQuizVersion],
        [currentQuestionIndex]: answer
      }
    }))
  }

  const handleQuestionNavigation = (index: number) => {
    if (currentQuiz.preventBackNavigation && index < currentQuestionIndex) {
      setShowBackNavigationWarning(true)
      return
    }
    setCurrentQuestionIndex(index)
  }

  const getUnansweredCount = () => {
    return currentQuiz.Questions.filter((_, index) => !userAnswers[selectedQuizVersion]?.[index] || userAnswers[selectedQuizVersion]?.[index].length === 0).length
  }

  const handleSubmit = () => {
    const uncompleted = getUnansweredCount()
    
    if (uncompleted > 0 && !showWarning) {
      setUnansweredCount(uncompleted)
      setShowWarning(true)
      return
    }

    setQuizSubmitted(true)
    setAttemptsLeft((prev) => prev - 1)
    let totalScore = 0
    currentQuiz.Questions.forEach((question, index) => {
      const userAnswer = userAnswers[selectedQuizVersion]?.[index] || []
      const correctAnswer = question.Answer
      if (Array.isArray(correctAnswer)) {
        if (Array.isArray(userAnswer) && userAnswer.length === correctAnswer.length && userAnswer.every(ans => correctAnswer.includes(ans))) {
          totalScore += question.Points
        }
      } else {
        if (userAnswer === correctAnswer) {
          totalScore += question.Points
        }
      }
    })
    setScore(totalScore)
    setShowWarning(false)
    toast({
      title: "Quiz Submitted",
      description: `Your score: ${totalScore}/${currentQuiz["Total Points"]}`,
    })
  }

  const handleRetry = () => {
    if (attemptsLeft > 0) {
      setQuizSubmitted(false)
      setUserAnswers((prev) => ({ ...prev, [selectedQuizVersion]: {} }))
      setCurrentQuestionIndex(0)
      setTimeRemaining(currentQuiz["Time Allowed"] * 60)
      setScore(0)
      toast({
        title: "Quiz Reset",
        description: "You can now retake the quiz.",
      })
    } else {
      toast({
        title: "No Attempts Left",
        description: "You have used all your attempts for this quiz.",
        variant: "destructive",
      })
    }
  }

  const handleQuizVersionChange = (version: string) => {
    setSelectedQuizVersion(version)
    setCurrentQuestionIndex(0)
    setQuizSubmitted(false)
    setScore(0)
    setTimeRemaining(60 * 60)
    setAttemptsLeft(quizData.Quizzes.find(quiz => quiz.Version === version)?.["Number Attempts Allowed"] || 3)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  const renderQuestion = () => {
    if (currentQuestion["Question Type"] === "Single Answer") {
      return (
        <RadioGroup
          value={userAnswers[selectedQuizVersion]?.[currentQuestionIndex] as string}
          onValueChange={(value) => handleAnswer(value)}
        >
          {Object.entries(currentQuestion.Options).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <RadioGroupItem value={key} id={`option-${key}`} />
              <Label htmlFor={`option-${key}`}>{value}</Label>
            </div>
          ))}
        </RadioGroup>
      )
    } else if (currentQuestion["Question Type"] === "Multiple Answer") {
      return (
        <div className="space-y-2">
          {Object.entries(currentQuestion.Options).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={`option-${key}`}
                checked={(userAnswers[selectedQuizVersion]?.[currentQuestionIndex] as string[] || []).includes(key)}
                onCheckedChange={(checked) => {
                  const currentAnswers = userAnswers[selectedQuizVersion]?.[currentQuestionIndex] as string[] || []
                  if (checked) {
                    handleAnswer([...currentAnswers, key])
                  } else {
                    handleAnswer(currentAnswers.filter((ans) => ans !== key))
                  }
                }}
              />
              <Label htmlFor={`option-${key}`}>{value}</Label>
            </div>
          ))}
        </div>
      )
    }
  }

  const renderFeedback = () => {
    return currentQuiz.Questions.map((question, index) => {
      const userAnswer = userAnswers[selectedQuizVersion]?.[index] || (question["Question Type"] === "Multiple Answer" ? [] : "")
      const isCorrect = Array.isArray(question.Answer)
        ? Array.isArray(userAnswer) && question.Answer.every((ans) => userAnswer.includes(ans)) && userAnswer.length === question.Answer.length
        : userAnswer === question.Answer

      return (
        <div key={index} className="mb-4 p-4 bg-card rounded-lg shadow">
          <h3 className="font-semibold mb-2">Question {index + 1}: {question["Question Text"]}</h3>
          <p className="mb-2">Your answer: {
            Array.isArray(userAnswer) 
              ? (userAnswer.length > 0 ? userAnswer.map(ans => question.Options[ans as keyof typeof question.Options]).join(", ") : "No answer provided")
              : (userAnswer ? question.Options[userAnswer as keyof typeof question.Options] : "No answer provided")
          }</p>
          <p className="mb-2">Correct answer: {Array.isArray(question.Answer) ? question.Answer.map(ans => question.Options[ans as keyof typeof question.Options]).join(", ") : question.Options[question.Answer as keyof typeof question.Options]}</p>
          <p className={`font-semibold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
            {isCorrect ? "Correct" : "Incorrect"}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{question.Explanation}</p>
        </div>
      )
    })
  }

  const renderQuestionNavigation = () => {
    const totalQuestions = currentQuiz.Questions.length
    const maxVisibleButtons = 7 // Adjust this number to change the number of visible buttons
    const ellipsis = '...'

    let buttons = []
    if (totalQuestions <= maxVisibleButtons) {
      buttons = Array.from({ length: totalQuestions }, (_, i) => i)
    } else {
      const sideButtons = 2 // Number of buttons to show on each side of the current question
      const currentPage = currentQuestionIndex
      
      if (currentPage <= sideButtons + 1) {
        buttons = [...Array.from({ length: maxVisibleButtons - 1 }, (_, i) => i), totalQuestions - 1]
      } else if (currentPage >= totalQuestions - sideButtons - 2) {
        buttons = [0, ...Array.from({ length: maxVisibleButtons - 1 }, (_, i) => totalQuestions - maxVisibleButtons + i + 1)]
      } else {
        buttons = [
          0,
          ellipsis,
          ...Array.from({ length: sideButtons * 2 + 1 }, (_, i) => currentPage - sideButtons + i),
          ellipsis,
          totalQuestions - 1
        ]
      }
    }

    return (
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {buttons.map((button, index) => {
          if (button === ellipsis) {
            return <span key={`ellipsis-${index}`} className="flex items-center justify-center w-10 h-10">{ellipsis}</span>
          }
          const questionIndex = typeof button === 'number' ? button : index
          const isAnswered = !!userAnswers[selectedQuizVersion]?.[questionIndex]
          return (
            <Button
              key={questionIndex}
              variant={currentQuestionIndex === questionIndex ? "default" : "outline"}
              size="sm"
              onClick={() => handleQuestionNavigation(questionIndex)}
              disabled={currentQuiz.preventBackNavigation && questionIndex < currentQuestionIndex}
              className={`w-10 h-10 ${
                isAnswered ? "bg-green-500 hover:bg-green-600 text-white" : ""
              } ${
                currentQuiz.preventBackNavigation && questionIndex < currentQuestionIndex 
                  ? "cursor-not-allowed opacity-50" 
                  : ""
              }`}
            >
              {questionIndex + 1}
            </Button>
          )
        })}
      </div>
    )
  }

  const BackNavigationWarning = () => (
    <AlertDialog open={showBackNavigationWarning} onOpenChange={setShowBackNavigationWarning}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Important Quiz Rules</AlertDialogTitle>
          <AlertDialogDescription>
            This quiz has backward navigation disabled. Once you move to the next question, 
            you cannot return to previous questions. Please ensure you are confident with 
            your answer before proceeding.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setShowBackNavigationWarning(false)}>
            I Understand
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return (
    <Card className="w-full max-w-4xl mx-auto">
      {currentQuiz.preventBackNavigation && <BackNavigationWarning />}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="quiz-title">{currentQuiz.Name}</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={selectedQuizVersion} onValueChange={handleQuizVersionChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select quiz version" />
            </SelectTrigger>
            <SelectContent>
              {quizData.Quizzes.map((quiz) => (
                <SelectItem key={quiz.Version} value={quiz.Version}>
                  Version {quiz.Version}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {mounted ? (
              theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />
            ) : (
              <div className="h-4 w-4" /> // Placeholder while mounting
            )}
          </Button>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{formatTime(timeRemaining)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <RefreshCcw className="h-4 w-4" />
            <span>{attemptsLeft}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {renderQuestionNavigation()}
        {showWarning && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  You have {unansweredCount} unanswered {unansweredCount === 1 ? 'question' : 'questions'}. 
                  Do you want to submit anyway? Unanswered questions will be marked as incorrect.
                </p>
                <div className="mt-4">
                  <button
                    onClick={handleSubmit}
                    className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    Submit Anyway
                  </button>
                  <button
                    onClick={() => setShowWarning(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                  >
                    Continue Answering
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {!quizSubmitted ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Progress
                value={(currentQuestionIndex + 1) / currentQuiz.Questions.length * 100}
                className="mb-4"
              />
              <h2 className="question-text">
                Question {currentQuestionIndex + 1} of {currentQuiz.Questions.length}
              </h2>
              <p className="text-lg leading-relaxed mb-6">{currentQuestion["Question Text"]}</p>
              {renderQuestion()}
              <div className="mt-4 text-sm text-muted-foreground">
                Difficulty: {currentQuestion["Question Difficulty Level"]} | 
                Points: {currentQuestion.Points}
              </div>
              <div className="flex justify-between mt-6">
                <Button
                  onClick={() => handleQuestionNavigation(currentQuestionIndex - 1)}
                  disabled={currentQuestionIndex === 0 || currentQuiz.preventBackNavigation}
                  className={currentQuiz.preventBackNavigation ? "cursor-not-allowed opacity-50" : ""}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button
                  onClick={() => handleQuestionNavigation(currentQuestionIndex + 1)}
                  disabled={currentQuestionIndex === currentQuiz.Questions.length - 1}
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Quiz Results</h2>
            <p className="mb-4">Your score: {score}/{currentQuiz["Total Points"]}</p>
            {renderFeedback()}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!quizSubmitted ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Submit Quiz</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to submit?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Make sure you have answered all questions to the best of your ability.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button onClick={handleRetry} disabled={attemptsLeft === 0}>
            Retry Quiz
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}