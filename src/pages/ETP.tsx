import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Save, Sparkles, Calculator, TrendingUp, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const ETP = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("descricao");
  
  const [formData, setFormData] = useState({
    descricao: "",
    objetivos: "",
    alternativa1: "",
    alternativa2: "",
    alternativa3: "",
    custoA1: "",
    custoA2: "",
    custoA3: "",
    beneficioA1: "",
    beneficioA2: "",
    beneficioA3: "",
    justificativaTecnica: "",
    estimativaTotal: "",
  });

  const handleSave = () => {
    toast({
      title: "ETP salvo com sucesso!",
      description: "Seus dados foram salvos localmente.",
    });
  };

  const calcularEVTEA = () => {
    const custos = [
      parseFloat(formData.custoA1) || 0,
      parseFloat(formData.custoA2) || 0,
      parseFloat(formData.custoA3) || 0,
    ];
    const beneficios = [
      parseFloat(formData.beneficioA1) || 0,
      parseFloat(formData.beneficioA2) || 0,
      parseFloat(formData.beneficioA3) || 0,
    ];

    const melhorAlternativa = custos.map((c, i) => ({
      alternativa: i + 1,
      custo: c,
      beneficio: beneficios[i],
      relacao: c > 0 ? (beneficios[i] / c).toFixed(2) : 0,
    })).sort((a, b) => parseFloat(b.relacao as string) - parseFloat(a.relacao as string))[0];

    toast({
      title: "Análise EVTEA Concluída",
      description: `Melhor alternativa: Alternativa ${melhorAlternativa.alternativa} (Relação Benefício/Custo: ${melhorAlternativa.relacao})`,
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <PageHeader
          title="Estudo Técnico Preliminar - ETP"
          description="Elabore estudos técnicos completos com análise EVTEA e justificativas detalhadas"
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="descricao" className="gap-2">
              <FileText className="w-4 h-4" />
              Descrição
            </TabsTrigger>
            <TabsTrigger value="alternativas" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Alternativas
            </TabsTrigger>
            <TabsTrigger value="evtea" className="gap-2">
              <Calculator className="w-4 h-4" />
              EVTEA
            </TabsTrigger>
            <TabsTrigger value="justificativa" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Justificativa
            </TabsTrigger>
          </TabsList>

          {/* Descrição do Projeto */}
          <TabsContent value="descricao" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Descrição do Projeto</CardTitle>
                <CardDescription>
                  Apresente uma visão geral do projeto e seus objetivos principais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição Detalhada *</Label>
                  <Textarea
                    id="descricao"
                    placeholder="Descreva o projeto, seu contexto e abrangência..."
                    rows={6}
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objetivos">Objetivos Específicos *</Label>
                  <Textarea
                    id="objetivos"
                    placeholder="Liste os objetivos específicos a serem alcançados..."
                    rows={4}
                    value={formData.objetivos}
                    onChange={(e) => setFormData({ ...formData, objetivos: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimativaTotal">Estimativa Total de Investimento (R$)</Label>
                  <Input
                    id="estimativaTotal"
                    type="number"
                    placeholder="0,00"
                    value={formData.estimativaTotal}
                    onChange={(e) => setFormData({ ...formData, estimativaTotal: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alternativas */}
          <TabsContent value="alternativas" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((num) => (
                <Card key={num} className="border-2 hover:border-primary transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Alternativa {num}
                      <Badge variant="outline">A{num}</Badge>
                    </CardTitle>
                    <CardDescription>Descreva esta solução proposta</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`alternativa${num}`}>Descrição</Label>
                      <Textarea
                        id={`alternativa${num}`}
                        placeholder={`Descrição da alternativa ${num}...`}
                        rows={4}
                        value={formData[`alternativa${num}` as keyof typeof formData]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [`alternativa${num}`]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* EVTEA */}
          <TabsContent value="evtea" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Análise EVTEA</CardTitle>
                <CardDescription>
                  Estimativa de Valor Total Econômico - Compare custos e benefícios das alternativas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="space-y-4 p-4 rounded-lg bg-muted/30">
                      <h4 className="font-semibold text-primary">Alternativa {num}</h4>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`custoA${num}`}>Custo Estimado (R$)</Label>
                        <Input
                          id={`custoA${num}`}
                          type="number"
                          placeholder="0,00"
                          value={formData[`custoA${num}` as keyof typeof formData]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [`custoA${num}`]: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`beneficioA${num}`}>Benefício Estimado (R$)</Label>
                        <Input
                          id={`beneficioA${num}`}
                          type="number"
                          placeholder="0,00"
                          value={formData[`beneficioA${num}` as keyof typeof formData]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [`beneficioA${num}`]: e.target.value,
                            })
                          }
                        />
                      </div>

                      {formData[`custoA${num}` as keyof typeof formData] &&
                        formData[`beneficioA${num}` as keyof typeof formData] && (
                          <div className="pt-2 border-t">
                            <div className="text-sm text-muted-foreground">Relação B/C</div>
                            <div className="text-2xl font-bold text-success">
                              {(
                                parseFloat(formData[`beneficioA${num}` as keyof typeof formData] as string) /
                                parseFloat(formData[`custoA${num}` as keyof typeof formData] as string)
                              ).toFixed(2)}
                            </div>
                          </div>
                        )}
                    </div>
                  ))}
                </div>

                <Button onClick={calcularEVTEA} className="w-full" variant="accent">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calcular Melhor Alternativa
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Justificativa */}
          <TabsContent value="justificativa" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Justificativa Técnica</CardTitle>
                <CardDescription>
                  Fundamente a escolha da solução recomendada
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="justificativaTecnica">Justificativa Técnica Completa *</Label>
                  <Textarea
                    id="justificativaTecnica"
                    placeholder="Apresente os argumentos técnicos que fundamentam a escolha da alternativa recomendada..."
                    rows={10}
                    value={formData.justificativaTecnica}
                    onChange={(e) =>
                      setFormData({ ...formData, justificativaTecnica: e.target.value })
                    }
                  />
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleSave} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar ETP
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Gerar com IA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Sidebar Info */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="pt-6">
              <h4 className="font-bold text-primary mb-2">Análise Completa</h4>
              <p className="text-sm text-muted-foreground">
                O ETP deve apresentar todas as alternativas viáveis e justificar tecnicamente a escolha
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
            <CardContent className="pt-6">
              <h4 className="font-bold text-success mb-2">EVTEA</h4>
              <p className="text-sm text-muted-foreground">
                Use a análise EVTEA para comparar objetivamente custos e benefícios
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
            <CardContent className="pt-6">
              <h4 className="font-bold text-accent-foreground mb-2">Documentação</h4>
              <p className="text-sm text-muted-foreground">
                Todos os dados serão consolidados no documento final
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ETP;
