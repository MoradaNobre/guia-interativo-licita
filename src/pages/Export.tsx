import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileSpreadsheet, Printer, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Export = () => {
  const { toast } = useToast();

  const exportFormats = [
    {
      title: "Exportar como PDF",
      description: "Documento formatado pronto para impressão e assinatura",
      icon: FileText,
      format: "PDF",
      color: "text-destructive",
    },
    {
      title: "Exportar como DOCX",
      description: "Documento editável no Microsoft Word",
      icon: FileText,
      format: "DOCX",
      color: "text-primary",
    },
    {
      title: "Exportar como Excel",
      description: "Planilha com dados estruturados e análises",
      icon: FileSpreadsheet,
      format: "XLSX",
      color: "text-success",
    },
  ];

  const handleExport = (format: string) => {
    toast({
      title: "Exportação iniciada",
      description: `Gerando documento no formato ${format}...`,
    });

    // Simular exportação
    setTimeout(() => {
      toast({
        title: "Exportação concluída!",
        description: `Documento ${format} gerado com sucesso.`,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <PageHeader
          title="Exportação de Documentos"
          description="Gere documentos finais formatados e prontos para assinatura e protocolo"
        />

        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-success" />
                <div>
                  <div className="text-sm text-muted-foreground">DFD</div>
                  <div className="font-bold text-foreground">Completo</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-success" />
                <div>
                  <div className="text-sm text-muted-foreground">ETP</div>
                  <div className="font-bold text-foreground">Completo</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-warning" />
                <div>
                  <div className="text-sm text-muted-foreground">Riscos</div>
                  <div className="font-bold text-foreground">Parcial</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-success" />
                <div>
                  <div className="text-sm text-muted-foreground">AHP</div>
                  <div className="font-bold text-foreground">Completo</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export Options */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {exportFormats.map((format, index) => (
            <Card
              key={format.format}
              className="hover:shadow-lg transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-3 rounded-lg bg-muted/30`}>
                    <format.icon className={`w-6 h-6 ${format.color}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{format.title}</CardTitle>
                  </div>
                </div>
                <CardDescription>{format.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => handleExport(format.format)}
                  className="w-full"
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar {format.format}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Preview Card */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Printer className="w-5 h-5" />
              Pré-visualização do Documento
            </CardTitle>
            <CardDescription>
              Visualize como seu documento ficará antes de exportar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted rounded-lg p-8 bg-muted/10">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-3 pb-4 border-b-2 border-accent">
                  <div className="text-3xl font-extrabold text-primary">Sistema de Gestão</div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-foreground">
                    Documento de Formalização de Demanda
                  </h2>
                  <p className="text-muted-foreground">
                    Este documento consolida todas as informações coletadas nos módulos DFD, ETP, Mapa de
                    Riscos e Análise AHP.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <div className="text-sm text-muted-foreground">Data de Criação</div>
                    <div className="font-semibold">
                      {new Date().toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className="font-semibold text-success">Pronto para Exportação</div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="accent" className="w-full" size="lg">
                    <Printer className="w-4 h-4 mr-2" />
                    Visualizar Documento Completo
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Banner */}
        <Card className="mt-8 bg-gradient-to-r from-accent/10 to-accent/5 border-accent/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Download className="w-6 h-6 text-accent-foreground flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-foreground mb-2">Dica de Exportação</h4>
                <p className="text-sm text-muted-foreground">
                  Todos os documentos exportados incluem cabeçalho, rodapé, numeração de páginas e estão
                  formatados conforme as normas de documentação técnica. Os arquivos são salvos
                  automaticamente no seu dispositivo.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Export;
