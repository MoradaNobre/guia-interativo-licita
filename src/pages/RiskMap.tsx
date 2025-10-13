import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Plus, Trash2, Shield, AlertTriangle, Save, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Risk {
  id: string;
  descricao: string;
  probabilidade: string;
  impacto: string;
  categoria: string;
  mitigacao: string;
}

const RiskMap = () => {
  const { toast } = useToast();
  const [risks, setRisks] = useState<Risk[]>([
    {
      id: "1",
      descricao: "Atraso na entrega de equipamentos",
      probabilidade: "media",
      impacto: "alto",
      categoria: "operacional",
      mitigacao: "Contrato com cláusulas de penalidade",
    },
  ]);

  const [newRisk, setNewRisk] = useState<Partial<Risk>>({
    descricao: "",
    probabilidade: "",
    impacto: "",
    categoria: "",
    mitigacao: "",
  });

  const addRisk = () => {
    if (!newRisk.descricao || !newRisk.probabilidade || !newRisk.impacto) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha descrição, probabilidade e impacto.",
        variant: "destructive",
      });
      return;
    }

    const risk: Risk = {
      id: Date.now().toString(),
      descricao: newRisk.descricao,
      probabilidade: newRisk.probabilidade || "",
      impacto: newRisk.impacto || "",
      categoria: newRisk.categoria || "operacional",
      mitigacao: newRisk.mitigacao || "",
    };

    setRisks([...risks, risk]);
    setNewRisk({ descricao: "", probabilidade: "", impacto: "", categoria: "", mitigacao: "" });
    toast({
      title: "Risco adicionado!",
      description: "O risco foi adicionado ao mapa.",
    });
  };

  const removeRisk = (id: string) => {
    setRisks(risks.filter((r) => r.id !== id));
    toast({
      title: "Risco removido",
      description: "O risco foi removido do mapa.",
    });
  };

  const calculateRiskLevel = (probabilidade: string, impacto: string) => {
    const probValue = { baixa: 1, media: 2, alta: 3 }[probabilidade] || 0;
    const impValue = { baixo: 1, medio: 2, alto: 3, critico: 4 }[impacto] || 0;
    const score = probValue * impValue;

    if (score <= 2) return { label: "Baixo", color: "success" };
    if (score <= 4) return { label: "Médio", color: "warning" };
    if (score <= 6) return { label: "Alto", color: "destructive" };
    return { label: "Crítico", color: "destructive" };
  };

  const getRisksByLevel = (level: string) => {
    return risks.filter((r) => calculateRiskLevel(r.probabilidade, r.impacto).label === level);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <PageHeader
          title="Mapa de Riscos"
          description="Identifique, avalie e gerencie riscos do projeto com matriz de probabilidade e impacto"
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Shield className="w-8 h-8 text-success" />
                <span className="text-3xl font-bold text-success">{getRisksByLevel("Baixo").length}</span>
              </div>
              <p className="text-sm font-semibold text-foreground">Riscos Baixos</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-8 h-8 text-warning" />
                <span className="text-3xl font-bold text-warning">{getRisksByLevel("Médio").length}</span>
              </div>
              <p className="text-sm font-semibold text-foreground">Riscos Médios</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-8 h-8 text-destructive" />
                <span className="text-3xl font-bold text-destructive">{getRisksByLevel("Alto").length}</span>
              </div>
              <p className="text-sm font-semibold text-foreground">Riscos Altos</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-destructive/20 to-destructive/10 border-destructive/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-8 h-8 text-destructive" />
                <span className="text-3xl font-bold text-destructive">{getRisksByLevel("Crítico").length}</span>
              </div>
              <p className="text-sm font-semibold text-foreground">Riscos Críticos</p>
            </CardContent>
          </Card>
        </div>

        {/* Add New Risk */}
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Adicionar Novo Risco
            </CardTitle>
            <CardDescription>Identifique um novo risco e suas características</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor="descricao">Descrição do Risco *</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva o risco identificado..."
                  rows={2}
                  value={newRisk.descricao}
                  onChange={(e) => setNewRisk({ ...newRisk, descricao: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="probabilidade">Probabilidade *</Label>
                <Select
                  value={newRisk.probabilidade}
                  onValueChange={(value) => setNewRisk({ ...newRisk, probabilidade: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="impacto">Impacto *</Label>
                <Select
                  value={newRisk.impacto}
                  onValueChange={(value) => setNewRisk({ ...newRisk, impacto: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixo">Baixo</SelectItem>
                    <SelectItem value="medio">Médio</SelectItem>
                    <SelectItem value="alto">Alto</SelectItem>
                    <SelectItem value="critico">Crítico</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Select
                  value={newRisk.categoria}
                  onValueChange={(value) => setNewRisk({ ...newRisk, categoria: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operacional">Operacional</SelectItem>
                    <SelectItem value="financeiro">Financeiro</SelectItem>
                    <SelectItem value="tecnico">Técnico</SelectItem>
                    <SelectItem value="juridico">Jurídico</SelectItem>
                    <SelectItem value="ambiental">Ambiental</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mitigacao">Ação de Mitigação</Label>
                <Input
                  id="mitigacao"
                  placeholder="Como mitigar este risco..."
                  value={newRisk.mitigacao}
                  onChange={(e) => setNewRisk({ ...newRisk, mitigacao: e.target.value })}
                />
              </div>
            </div>

            <Button onClick={addRisk} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Risco
            </Button>
          </CardContent>
        </Card>

        {/* Risks List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Riscos Identificados</h2>
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Salvar Mapa
            </Button>
          </div>

          {risks.length === 0 ? (
            <Card className="p-12 text-center">
              <Shield className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Nenhum risco identificado ainda.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {risks.map((risk) => {
                const riskLevel = calculateRiskLevel(risk.probabilidade, risk.impacto);
                return (
                  <Card key={risk.id} className="hover:shadow-lg transition-shadow animate-fade-in">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start gap-3">
                            <AlertTriangle 
                              className={`w-5 h-5 mt-0.5 ${
                                riskLevel.color === 'success' ? 'text-success' :
                                riskLevel.color === 'warning' ? 'text-warning' :
                                'text-destructive'
                              }`} 
                            />
                            <div className="flex-1">
                              <p className="font-semibold text-foreground">{risk.descricao}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {risk.categoria}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Prob: {risk.probabilidade}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Impacto: {risk.impacto}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${
                                    riskLevel.color === 'success' ? 'bg-success/10 text-success border-success/30' :
                                    riskLevel.color === 'warning' ? 'bg-warning/10 text-warning border-warning/30' :
                                    'bg-destructive/10 text-destructive border-destructive/30'
                                  }`}
                                >
                                  Nível: {riskLevel.label}
                                </Badge>
                              </div>
                              {risk.mitigacao && (
                                <div className="mt-2 p-2 rounded bg-muted/50">
                                  <p className="text-xs text-muted-foreground">
                                    <span className="font-semibold">Mitigação:</span> {risk.mitigacao}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeRisk(risk.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskMap;
