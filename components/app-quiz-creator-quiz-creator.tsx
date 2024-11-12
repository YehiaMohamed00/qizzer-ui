"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { 
  Settings, 
  BarChart, 
  PlusCircle, 
  Trash2, 
  Eye, 
  Save, 
  ArrowLeft, 
  HelpCircle, 
  Sun, 
  Moon,
  Laptop,
  Upload,
  FileText,
  Globe
} from "lucide-react"

const questionTypes = [
  { value: "multiple-choice", label: "Multiple Choice", icon: "🅰️" },
  { value: "multiple-answer", label: "Multiple Answer", icon: "✅" },
  { value: "true-false", label: "True/False", icon: "❓" },
  { value: "short-answer", label: "Short Answer", icon: "📝" },
  { value: "fill-in-blank", label: "Fill in the Blank", icon: "➖" },
  { value: "matching", label: "Matching", icon: "🔗" },
]

const difficultyLevels = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
]

export function QuizCreator() {
  const [activeTab, setActiveTab] = useState("resources")
  const [pdfFiles, setPdfFiles] = useState<File[]>([])
  const [webpageUrl, setWebpageUrl] = useState("")
  const [questions, setQuestions] = useState([{ type: "multiple-choice", text: "", options: ["", ""] }])
  const [quizTitle, setQuizTitle] = useState("")
  const [quizDescription, setQuizDescription] = useState("")
  const [numberOfQuestions, setNumberOfQuestions] = useState(10)
  const [difficultyLevel, setDifficultyLevel] = useState("medium")
  const [timeLimit, setTimeLimit] = useState(30)
  const [gradeWeight, setGradeWeight] = useState(100)
  const [customGradingScheme, setCustomGradingScheme] = useState("")
  const [multipleVersions, setMultipleVersions] = useState(false)
  const [preventBackNavigation, setPreventBackNavigation] = useState(false)
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPdfFiles(Array.from(e.target.files))
    }
  }

  const addQuestion = () => {
    setQuestions([...questions, { type: "multiple-choice", text: "", options: ["", ""] }])
  }

  const removeQuestion = (index: number) => {
    const newQuestions = [...questions]
    newQuestions.splice(index, 1)
    setQuestions(newQuestions)
  }

  const updateQuestion = (index: number, field: string, value: string) => {
    const newQuestions = [...questions]
    newQuestions[index] = { ...newQuestions[index], [field]: value }
    setQuestions(newQuestions)
  }

  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options.push("")
    setQuestions(newQuestions)
  }

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options[optionIndex] = value
    setQuestions(newQuestions)
  }

  const handleSave = () => {
    const quizData = {
      title: quizTitle,
      description: quizDescription,
      pdfFiles: pdfFiles.map(file => file.name),
      webpageUrl,
      questions,
      numberOfQuestions,
      difficultyLevel,
      timeLimit,
      gradeWeight,
      customGradingScheme,
      multipleVersions,
      preventBackNavigation: preventBackNavigation,
    }
    console.log(JSON.stringify(quizData, null, 2))
    toast({
      title: "Quiz Saved",
      description: "Your quiz has been saved successfully.",
    })
    router.push(process.env.NODE_ENV === 'production' ? '/data-science-quiz' : '/data-science-quiz')
  }

  const handlePreview = () => {
    // Navigate to the Enhanced Quiz component
    router.push(process.env.NODE_ENV === 'production' ? '/data-science-quiz' : '/data-science-quiz')
  }

  const renderQuestion = (question: any, index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mb-6 p-4 bg-card rounded-lg shadow"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="question-text">Question {index + 1}</h3>
        <Button variant="ghost" size="icon" onClick={() => removeQuestion(index)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <Select
        value={question.type}
        onValueChange={(value) => updateQuestion(index, "type", value)}
      >
        <SelectTrigger className="w-full mb-2">
          <SelectValue placeholder="Select question type" />
        </SelectTrigger>
        <SelectContent>
          {questionTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              <span className="mr-2">{type.icon}</span>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea
        value={question.text}
        onChange={(e) => updateQuestion(index, "text", e.target.value)}
        placeholder="Enter your question here"
        className="mb-2"
      />
      {(question.type === "multiple-choice" || question.type === "multiple-answer") && (
        <div className="space-y-2">
          {question.options.map((option: string, optionIndex: number) => (
            <Input
              key={optionIndex}
              value={option}
              onChange={(e) => updateOption(index, optionIndex, e.target.value)}
              placeholder={`Option ${optionIndex + 1}`}
            />
          ))}
          <Button onClick={() => addOption(index)} variant="outline" size="sm">
            Add Option
          </Button>
        </div>
      )}
    </motion.div>
  )

  return (
    <TooltipProvider>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="quiz-title">Quiz Creator</CardTitle>
          <div className="flex space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
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
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle theme</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setTheme("system")}>
                  <Laptop className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Use system theme</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-4">
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="scoring">Scoring</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="resources">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pdf-upload">Upload PDF Files</Label>
                  <Input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={handleFileChange}
                    className="mt-1"
                  />
                </div>
                {pdfFiles.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Uploaded Files:</h3>
                    <ul className="list-disc pl-5">
                      {pdfFiles.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div>
                  <Label htmlFor="webpage-url">Webpage URL</Label>
                  <Input
                    id="webpage-url"
                    type="url"
                    value={webpageUrl}
                    onChange={(e) => setWebpageUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="mt-1"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="details">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="quiz-title">Quiz Title</Label>
                  <Input
                    id="quiz-title"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    placeholder="Enter quiz title"
                  />
                </div>
                <div>
                  <Label htmlFor="quiz-description">Quiz Description</Label>
                  <Textarea
                    id="quiz-description"
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    placeholder="Enter quiz description"
                  />
                </div>
                <div>
                  <Label htmlFor="num-questions">Number of Questions</Label>
                  <Input
                    id="num-questions"
                    type="number"
                    value={numberOfQuestions}
                    onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
                    min={1}
                  />
                </div>
                <div>
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficultyLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="time-limit">Time Limit (minutes)</Label>
                  <Input
                    id="time-limit"
                    type="number"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                    min={1}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="questions">
              <div className="space-y-4">
                <AnimatePresence>
                  {questions.map((question, index) => renderQuestion(question, index))}
                </AnimatePresence>
                <Button onClick={addQuestion} className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Question
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="scoring">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="grade-weight">Overall Grade Weight</Label>
                  <Input
                    id="grade-weight"
                    type="number"
                    value={gradeWeight}
                    onChange={(e) => setGradeWeight(parseInt(e.target.value))}
                    min={0}
                    max={100}
                  />
                </div>
                <div>
                  <Label htmlFor="custom-grading">Custom Grading Scheme</Label>
                  <Textarea
                    id="custom-grading"
                    value={customGradingScheme}
                    onChange={(e) => setCustomGradingScheme(e.target.value)}
                    placeholder="Enter custom grading criteria (e.g., partial credit, penalties, bonus points)"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="multiple-versions"
                    checked={multipleVersions}
                    onCheckedChange={setMultipleVersions}
                  />
                  <Label htmlFor="multiple-versions">Generate multiple versions of the quiz</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="prevent-back"
                    checked={preventBackNavigation}
                    onCheckedChange={setPreventBackNavigation}
                  />
                  <Label htmlFor="prevent-back">Prevent backward navigation during quiz</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>When enabled, students cannot go back to previous questions</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="preview">
              <div className="space-y-4">
                <h2 className="section-title">{quizTitle}</h2>
                <p className="text-base leading-relaxed mb-4">{quizDescription}</p>
                <div>
                  <strong>Number of Questions:</strong> {numberOfQuestions}
                </div>
                <div>
                  <strong>Difficulty:</strong> {difficultyLevel}
                </div>
                <div>
                  <strong>Time Limit:</strong> 
                  {timeLimit} minutes
                </div>
                <div>
                  <strong>Grade Weight:</strong> {gradeWeight}%
                </div>
                {questions.map((question, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold">Question {index + 1}</h3>
                    <p>{question.text}</p>
                    {(question.type === "multiple-choice" || question.type === "multiple-answer") && (
                      <ul className="list-disc pl-5">
                        {question.options.map((option: string, optionIndex: number) => (
                          <li key={optionIndex}>{option}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="analytics">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Quiz Analytics</h2>
                <p>Analytics features will be displayed here.</p>
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-6 flex justify-between items-center">
            <Button variant="outline" onClick={() => {
              const tabs = ["resources", "details", "questions", "scoring", "preview", "analytics"]
              const currentIndex = tabs.indexOf(activeTab)
              if (currentIndex > 0) {
                setActiveTab(tabs[currentIndex - 1])
              }
            }}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <div className="flex space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" onClick={handlePreview}>
                    <Eye className="mr-2 h-4 w-4" /> Preview
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Preview your quiz</p>
                </TooltipContent>
              </Tooltip>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Save Quiz
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}