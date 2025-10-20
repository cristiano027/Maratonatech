import Layout from "@/components/Layout";
import {
  Video,
  Upload,
  Camera,
  Play,
  CheckCircle2,
  Clock,
  AlertCircle,
  Leaf,
  Recycle,
  Zap as ElectronicIcon,
  Hammer,
} from "lucide-react";
import { useState, useRef } from "react";

interface PostSubmission {
  id: number;
  wasteType: string;
  wasteLabel: string;
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
  videoFile?: File;
  description: string;
  points: number;
}

const wasteTypes = [
  {
    id: "organic",
    name: "Orgânico",
    icon: Leaf,
    points: 25,
    color: "bg-[hsl(var(--organic))]",
  },
  {
    id: "recyclable",
    name: "Reciclável",
    icon: Recycle,
    points: 30,
    color: "bg-[hsl(var(--recyclable))]",
  },
  {
    id: "electronic",
    name: "Eletrônico",
    icon: ElectronicIcon,
    points: 50,
    color: "bg-[hsl(var(--electronic))]",
  },
  {
    id: "construction",
    name: "Entulho",
    icon: Hammer,
    points: 40,
    color: "bg-[hsl(var(--construction))]",
  },
];

export default function Postagens() {
  const [activeTab, setActiveTab] = useState<"novo" | "minhas">("novo");
  const [selectedWasteType, setSelectedWasteType] = useState<string>("");
  const [recordingMode, setRecordingMode] = useState<"upload" | "record">(
    "upload",
  );
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [description, setDescription] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordingTimeRef = useRef(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [submissions, setSubmissions] = useState<PostSubmission[]>([
    {
      id: 1,
      wasteType: "recyclable",
      wasteLabel: "Reciclável",
      status: "approved",
      submittedDate: "2024-01-15",
      description: "Separando materiais recicláveis corretamente",
      points: 30,
    },
    {
      id: 2,
      wasteType: "organic",
      wasteLabel: "Orgânico",
      status: "pending",
      submittedDate: "2024-01-18",
      description: "Fazendo compostagem caseira",
      points: 25,
    },
    {
      id: 3,
      wasteType: "electronic",
      wasteLabel: "Eletrônico",
      status: "rejected",
      submittedDate: "2024-01-12",
      description: "Descartando eletrônico incorretamente",
      points: 0,
    },
  ]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        alert("Arquivo muito grande. Máximo 100MB");
        return;
      }
      setVideoFile(file);
      const preview = URL.createObjectURL(file);
      setVideoPreview(preview);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      });

      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/mp4" });
        const file = new File([blob], `video-${Date.now()}.mp4`, {
          type: "video/mp4",
        });
        setVideoFile(file);
        const preview = URL.createObjectURL(blob);
        setVideoPreview(preview);

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      recordingTimeRef.current = 0;

      timerIntervalRef.current = setInterval(() => {
        recordingTimeRef.current += 1;
        if (recordingTimeRef.current >= 120) {
          stopRecording();
        }
      }, 1000);
    } catch (error) {
      console.error("Erro ao acessar câmera:", error);
      alert("Não foi possível acessar sua câmera");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
  };

  const handleSubmit = () => {
    if (!selectedWasteType || !videoFile || !description) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    const wasteTypeObj = wasteTypes.find((w) => w.id === selectedWasteType);
    if (!wasteTypeObj) return;

    const newSubmission: PostSubmission = {
      id: submissions.length + 1,
      wasteType: selectedWasteType,
      wasteLabel: wasteTypeObj.name,
      status: "pending",
      submittedDate: new Date().toISOString().split("T")[0],
      description,
      points: wasteTypeObj.points,
      videoFile,
    };

    setSubmissions([newSubmission, ...submissions]);
    setVideoFile(null);
    setVideoPreview("");
    setDescription("");
    setSelectedWasteType("");
    setRecordingMode("upload");
    alert(
      "Vídeo enviado para revisão! Você pode ganhar " +
        wasteTypeObj.points +
        " pontos se aprovado.",
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-amber-600" />;
      case "rejected":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "Aprovado";
      case "pending":
        return "Em Revisão";
      case "rejected":
        return "Rejeitado";
      default:
        return "";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-50 border-green-200";
      case "pending":
        return "bg-amber-50 border-amber-200";
      case "rejected":
        return "bg-red-50 border-red-200";
      default:
        return "";
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Compartilhe Sua Ação Sustentável
          </h1>
          <p className="text-muted-foreground">
            Grave ou envie vídeos de você descartando corretamente e ganhe
            pontos
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("novo")}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "novo"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Nova Postagem
          </button>
          <button
            onClick={() => setActiveTab("minhas")}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "minhas"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Minhas Postagens
          </button>
        </div>

        {activeTab === "novo" && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Waste Type Selection */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  1. Escolha o Tipo de Lixo
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {wasteTypes.map((waste) => {
                    const Icon = waste.icon;
                    return (
                      <button
                        key={waste.id}
                        onClick={() => setSelectedWasteType(waste.id)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedWasteType === waste.id
                            ? `${waste.color} border-current text-white shadow-lg`
                            : "bg-background border-border hover:border-primary text-foreground"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 mb-2 ${
                            selectedWasteType === waste.id
                              ? "text-current"
                              : "text-primary"
                          }`}
                        />
                        <p className="font-semibold text-sm">{waste.name}</p>
                        <p
                          className={`text-xs mt-1 ${
                            selectedWasteType === waste.id
                              ? "opacity-90"
                              : "text-muted-foreground"
                          }`}
                        >
                          {waste.points} pontos
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Video Input */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  2. Envie o Vídeo
                </h2>

                {/* Mode Selection */}
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => {
                      setRecordingMode("upload");
                      if (isRecording) stopRecording();
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      recordingMode === "upload"
                        ? "bg-primary text-white"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    <Upload className="w-4 h-4 inline mr-2" />
                    Upload
                  </button>
                  <button
                    onClick={() => setRecordingMode("record")}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      recordingMode === "record"
                        ? "bg-primary text-white"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    <Camera className="w-4 h-4 inline mr-2" />
                    Gravar
                  </button>
                </div>

                {recordingMode === "upload" && (
                  <div>
                    <label className="block">
                      <div className="border-2 border-dashed border-primary rounded-lg p-8 text-center hover:bg-primary/5 transition-colors cursor-pointer">
                        <Video className="w-12 h-12 text-primary mx-auto mb-3" />
                        <p className="font-medium text-foreground mb-1">
                          Clique para adicionar vídeo
                        </p>
                        <p className="text-sm text-muted-foreground">
                          MP4, WebM até 100MB (máximo 2 minutos)
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}

                {recordingMode === "record" && (
                  <div className="space-y-4">
                    <div className="bg-black rounded-lg overflow-hidden">
                      {!videoPreview && isRecording && (
                        <div className="w-full aspect-video bg-black flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="animate-pulse mb-4">
                              <div className="w-16 h-16 bg-red-600 rounded-full mx-auto"></div>
                            </div>
                            <p className="text-2xl font-bold">
                              {formatTime(recordingTimeRef.current)}
                            </p>
                            <p className="text-sm mt-2">Gravando...</p>
                          </div>
                        </div>
                      )}
                      {videoPreview && (
                        <video
                          src={videoPreview}
                          controls
                          className="w-full"
                        ></video>
                      )}
                      {!isRecording && !videoPreview && (
                        <div className="w-full aspect-video bg-gray-900 flex items-center justify-center">
                          <p className="text-gray-400">
                            Câmera aparecerá aqui durante a gravação
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={startRecording}
                        disabled={isRecording || videoPreview !== ""}
                        className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                      >
                        {isRecording ? "Gravando..." : "Iniciar Gravação"}
                      </button>
                      {isRecording && (
                        <button
                          onClick={stopRecording}
                          className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                        >
                          Parar Gravação
                        </button>
                      )}
                      {videoPreview && (
                        <button
                          onClick={() => {
                            setVideoPreview("");
                            setVideoFile(null);
                          }}
                          className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                        >
                          Descartar
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {videoFile && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-green-700">
                      {videoFile.name}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  3. Descrição (Opcional)
                </h2>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Conte como você está descartando corretamente..."
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!selectedWasteType || !videoFile}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
              >
                Enviar para Revisão
              </button>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Como Funciona
                </h3>
                <ol className="text-sm text-blue-800 space-y-2">
                  <li>1. Escolha o tipo de lixo</li>
                  <li>2. Grave ou envie um vídeo (até 2 min)</li>
                  <li>3. Sua ação será revisada</li>
                  <li>4. Se aprovada, você ganha pontos!</li>
                </ol>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-3">
                  Pontos por Tipo
                </h3>
                <div className="space-y-2">
                  {wasteTypes.map((waste) => (
                    <div
                      key={waste.id}
                      className="flex justify-between text-sm text-green-800"
                    >
                      <span>{waste.name}</span>
                      <span className="font-bold">{waste.points}pt</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "minhas" && (
          <div className="space-y-4">
            {submissions.length === 0 ? (
              <div className="text-center py-12">
                <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  Você ainda não enviou nenhum vídeo
                </p>
              </div>
            ) : (
              submissions.map((submission) => (
                <div
                  key={submission.id}
                  className={`border border-border rounded-lg p-6 ${getStatusColor(
                    submission.status,
                  )}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <Play className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">
                            {submission.wasteLabel}
                          </h3>
                          {getStatusIcon(submission.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {submission.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Enviado em {submission.submittedDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {getStatusLabel(submission.status)}
                      </p>
                      {submission.status === "approved" && (
                        <p className="text-lg font-bold text-green-600">
                          +{submission.points}pt
                        </p>
                      )}
                      {submission.status === "pending" && (
                        <p className="text-sm text-amber-600">
                          Ganhe {submission.points}pt se aprovado
                        </p>
                      )}
                      {submission.status === "rejected" && (
                        <p className="text-sm text-red-600">Não aprovado</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
