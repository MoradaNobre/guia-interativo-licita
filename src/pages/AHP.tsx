import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Plus, Trash2, Calculator, BarChart3, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Criterion {
  id: string;
  name: string;
}

interface Alternative {
  id: string;
  name: string;
}

const AHP = () => {
  const { toast } = useToast();
  const [criteria, setCriteria] = useState<Criterion[]>([
    { id: "1", name: "Custo" },
    { id: "2", name: "Qualidade" },
    { id: "3", name: "Prazo" },
  ]);
  const [alternatives, setAlternatives] = useState<Alternative[]>([
    { id: "1", name: "Alternativa A" },
    { id: "2", name: "Alternativa B" },
    { id: "3", name: "Alternativa C" },
  ]);

  const [newCriterion, setNewCriterion] = useState("");
  const [newAlternative, setNewAlternative] = useState("");
  const [comparisons, setComparisons] = useState<Record<string, number>>({});
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const addCriterion = () => {
    if (!newCriterion.trim()) return;
    setCriteria([...criteria, { id: Date.now().toString(), name: newCriterion }]);
    setNewCriterion("");
    toast({ title: "Critério adicionado!" });
  };

  const addAlternative = () => {
    if (!newAlternative.trim()) return;
    setAlternatives([...alternatives, { id: Date.now().toString(), name: newAlternative }]);
    setNewAlternative("");
    toast({ title: "Alternativa adicionada!" });
  };

  const removeCriterion = (id: string) => {
    setCriteria(criteria.filter((c) => c.id !== id));
  };

  const removeAlternative = (id: string) => {
    setAlternatives(alternatives.filter((a) => a.id !== id));
  };

  const getComparisonKey = (i: number, j: number) => `${i}-${j}`;

  const setComparison = (i: number, j: number, value: number) => {
    const key = getComparisonKey(i, j);
    const inverseKey = getComparisonKey(j, i);
    setComparisons({
      ...comparisons,
      [key]: value,
      [inverseKey]: value !== 0 ? 1 / value : 0,
    });
  };

  const calculateAHP = () => {
    if (criteria.length < 2 || alternatives.length < 2) {
      toast({
        title: "Dados insuficientes",
        description: "Adicione pelo menos 2 critérios e 2 alternativas.",
        variant: "destructive",
      });
      return;
    }

    // Cálculo simplificado de pesos (média normalizada)
    const weights = criteria.map((_, i) => {
      let sum = 0;
      criteria.forEach((_, j) => {
        const key = getComparisonKey(i, j);
        sum += comparisons[key] || (i === j ? 1 : 1);
      });
      return sum / criteria.length;
    });

    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const normalizedWeights = weights.map((w) => (w / totalWeight) * 100);

    const chartData = criteria.map((c, i) => ({
      name: c.name,
      peso: normalizedWeights[i].toFixed(1),
    }));

    setResults(chartData);
    setShowResults(true);

    toast({
      title: "Análise AHP Concluída!",
      description: "Os pesos dos critérios foram calculados.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <PageHeader
          title="Decisão AHP - Analytic Hierarchy Process"
          description="Método AHP para decisões multicritério complexas e objetivas"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Critérios */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Critérios de Decisão
              </CardTitle>
              <CardDescription>Defina os critérios para avaliação das alternativas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Nome do critério..."
                  value={newCriterion}
                  onChange={(e) => setNewCriterion(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addCriterion()}
                />
                <Button onClick={addCriterion} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {criteria.map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <span className="font-medium">{c.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCriterion(c.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alternativas */}
          <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Alternativas
              </CardTitle>
              <CardDescription>Defina as alternativas a serem comparadas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Nome da alternativa..."
                  value={newAlternative}
                  onChange={(e) => setNewAlternative(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addAlternative()}
                />
                <Button onClick={addAlternative} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {alternatives.map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <span className="font-medium">{a.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAlternative(a.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Matriz de Comparação */}
        {criteria.length >= 2 && (
          <Card className="mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle>Matriz de Comparação Par a Par</CardTitle>
              <CardDescription>
                Compare a importância relativa dos critérios (1=igual, 3=moderado, 5=forte, 7=muito forte,
                9=extremo)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 border bg-muted/50"></th>
                      {criteria.map((c) => (
                        <th key={c.id} className="p-2 border bg-muted/50 text-sm">
                          {c.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {criteria.map((c1, i) => (
                      <tr key={c1.id}>
                        <td className="p-2 border bg-muted/50 font-medium text-sm">{c1.name}</td>
                        {criteria.map((c2, j) => (
                          <td key={c2.id} className="p-2 border">
                            {i === j ? (
                              <div className="text-center font-bold text-primary">1</div>
                            ) : i < j ? (
                              <Input
                                type="number"
                                min="1"
                                max="9"
                                step="1"
                                className="w-20 text-center"
                                value={comparisons[getComparisonKey(i, j)] || ""}
                                onChange={(e) => setComparison(i, j, parseFloat(e.target.value) || 1)}
                              />
                            ) : (
                              <div className="text-center text-muted-foreground text-sm">
                                {comparisons[getComparisonKey(i, j)]
                                  ? comparisons[getComparisonKey(i, j)].toFixed(2)
                                  : "1.00"}
                              </div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex gap-3">
                <Button onClick={calculateAHP} className="flex-1" variant="accent">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calcular Pesos
                </Button>
                <Button variant="outline" className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Análise
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resultados */}
        {showResults && results.length > 0 && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Resultados da Análise AHP</CardTitle>
              <CardDescription>Pesos calculados para cada critério</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={results}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: "Peso (%)", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="peso" fill="hsl(var(--primary))" name="Peso do Critério (%)" />
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.map((r, i) => (
                  <div key={i} className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                    <div className="text-sm text-muted-foreground mb-1">{r.name}</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">{r.peso}</span>
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AHP;
