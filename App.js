import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  FlatList, 
  Image, 
  SafeAreaView,
  Modal,
  ScrollView,
  StatusBar,
  Linking,
  Switch,
  Vibration
} from 'react-native';

const TREINOS_SEMANA = {
  'Treino A': {
    foco: 'Peito, Ombros e Tríceps',
    exercicios: [
      { id: 'a1', nome: 'Supino Inclinado c/ Halteres', detalhes: '4 séries × 8-10 reps • Peitoral Superior', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=supino+inclinado+com+halteres+como+fazer' },
      { id: 'a2', nome: 'Supino Reto (Barra / Halter)', detalhes: '3 séries × 8-10 reps', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=supino+reto+como+fazer' },
      { id: 'a3', nome: 'Crossover / Voador (Pec Deck)', detalhes: '3 séries × 12 reps', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=crossover+voador+como+fazer' },
      { id: 'a4', nome: 'Desenvolvimento c/ Halteres', detalhes: '3 séries × 10 reps • Ombros', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=desenvolvimento+com+halteres+como+fazer' },
      { id: 'a5', nome: 'Elevação Lateral', detalhes: '4 séries × 12-15 reps • Alargar Ombros', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=elevacao+lateral+como+fazer' },
      { id: 'a6', nome: 'Tríceps Pulley (Corda/Barra)', detalhes: '3 séries × 10-12 reps', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=triceps+pulley+corda+como+fazer' },
      { id: 'a7', nome: 'Tríceps Testa', detalhes: '3 séries × 10-12 reps', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=triceps+testa+como+fazer' },
    ]
  },
  'Treino B': {
    foco: 'Costas, Bíceps e Antebraço',
    exercicios: [
      { id: 'b1', nome: 'Puxada Alta Aberta', detalhes: '4 séries × 8-10 reps • Largura (Efeito V)', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=puxada+alta+aberta+como+fazer' },
      { id: 'b2', nome: 'Remada Curvada / Baixa', detalhes: '3 séries × 8-10 reps • Espessura', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=remada+curvada+como+fazer' },
      { id: 'b3', nome: 'Remada Unilateral (Serrote)', detalhes: '3 séries × 10 reps', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=remada+unilateral+serrote+como+fazer' },
      { id: 'b4', nome: 'Rosca Direta (Barra W/Reta)', detalhes: '3 séries × 8-10 reps', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=rosca+direta+como+fazer' },
      { id: 'b5', nome: 'Rosca Alternada c/ Halteres', detalhes: '3 séries × 10-12 reps', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=rosca+alternada+como+fazer' },
      { id: 'b6', nome: 'Rosca Inversa', detalhes: '3 séries × 12 reps • Antebraço', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=rosca+inversa+como+fazer' },
    ]
  },
  'Treino C': {
    foco: 'Pernas Completas',
    exercicios: [
      { id: 'c1', nome: 'Agachamento Livre / Hack', detalhes: '4 séries × 8-10 reps', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=agachamento+livre+como+fazer' },
      { id: 'c2', nome: 'Leg Press 45°', detalhes: '3 séries × 10-12 reps', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=leg+press+45+como+fazer' },
      { id: 'c3', nome: 'Cadeira Extensora', detalhes: '3 séries × 12-15 reps', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=cadeira+extensora+como+fazer' },
      { id: 'c4', nome: 'Mesa Flexora', detalhes: '4 séries × 10-12 reps • Posterior', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=mesa+flexora+como+fazer' },
      { id: 'c5', nome: 'Gêmeos em Pé', detalhes: '4 séries × 15-20 reps • Pausa 2s no topo', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=panturrilha+em+pe+como+fazer' },
    ]
  },
  'Treino D': {
    foco: 'Peito, Ombros e Braços',
    exercicios: [
      { id: 'd1', nome: 'Supino Inclinado (Barra/Máq)', detalhes: '4 séries × 8-10 reps', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=supino+inclinado+barra+como+fazer' },
      { id: 'd2', nome: 'Flexão de Braço (Push-ups)', detalhes: '3 séries até a falha', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=flexao+de+braco+como+fazer' },
      { id: 'd3', nome: 'Elevação Lateral c/ Halteres', detalhes: '4 séries × 12-15 reps', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=elevacao+lateral+como+fazer' },
      { id: 'd4', nome: 'Rosca Martelo', detalhes: '3 séries × 10-12 reps • Bíceps e Antebraço', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=rosca+martelo+como+fazer' },
      { id: 'd5', nome: 'Tríceps Coice ou Francês', detalhes: '3 séries × 10-12 reps', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=triceps+frances+como+fazer' },
      { id: 'd6', nome: 'Abdominal Infra', detalhes: '3 séries × 15 reps • Elevação de pernas', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=abdominal+infra+como+fazer' },
    ]
  },
  'Treino E': {
    foco: 'Pernas e Panturrilhas',
    exercicios: [
      { id: 'e1', nome: 'Levantamento Terra Stiff', detalhes: '4 séries × 8-10 reps • Posterior e Glúteos', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=stiff+como+fazer' },
      { id: 'e2', nome: 'Agachamento Búlgaro / Afundo', detalhes: '3 séries × 10 reps por perna', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=agachamento+bulgaro+como+fazer' },
      { id: 'e3', nome: 'Cadeira Extensora', detalhes: '3 séries × 12-15 reps', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=cadeira+extensora+como+fazer' },
      { id: 'e4', nome: 'Gêmeos Sentado / Leg Press', detalhes: '4 séries × 15-20 reps', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=panturrilha+sentado+como+fazer' },
      { id: 'e5', nome: 'Abdominal Supra', detalhes: '3 séries × 15-20 reps • Chão ou Polia', fotoUrl: '', videoInstrutor: 'https://www.youtube.com/results?search_query=abdominal+supra+como+fazer' },
    ]
  }
};

export default function App() {
  const [treinos, setTreinos] = useState(TREINOS_SEMANA);
  const [treinoAtivo, setTreinoAtivo] = useState('Treino A');
  const [exercicioSelecionado, setExercicioSelecionado] = useState(null);

  // Tema Noturno / Claro
  const [modoNoturno, setModoNoturno] = useState(true);

  // Modais
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalConfigVisivel, setModalConfigVisivel] = useState(false);
  const [modalFotoVisivel, setModalFotoVisivel] = useState(false);
  const [modalProgressoVisivel, setModalProgressoVisivel] = useState(false);
  const [modalFinalizadoVisivel, setModalFinalizadoVisivel] = useState(false);

  // Inputs
  const [novoNome, setNovoNome] = useState('');
  const [novoDetalhe, setNovoDetalhe] = useState('');
  const [novaFotoUrl, setNovaFotoUrl] = useState('');
  const [novoVideoUrl, setNovoVideoUrl] = useState('');
  const [inputFotoManual, setInputFotoManual] = useState('');

  // Configurações
  const [tempoPadraoDescanso, setTempoPadraoDescanso] = useState(60);

  // Registro de Séries
  const [carga, setCarga] = useState('');
  const [repeticoes, setRepeticoes] = useState('');
  const [historico, setHistorico] = useState([]);

  // Cronômetro Descanso
  const [tempoDescanso, setTempoDescanso] = useState(0);
  const [cronometroAtivo, setCronometroAtivo] = useState(false);

  // Cronômetro Livre (Prancha / Flexível)
  const [tempoLivre, setTempoLivre] = useState(0);
  const [cronometroLivreAtivo, setCronometroLivreAtivo] = useState(false);

  // Effect Rest Timer
  useEffect(() => {
    let intervalo = null;
    if (cronometroAtivo && tempoDescanso > 0) {
      intervalo = setInterval(() => setTempoDescanso((prev) => prev - 1), 1000);
    } else if (tempoDescanso === 0 && cronometroAtivo) {
      setCronometroAtivo(false);
      Vibration.vibrate([500, 500, 500]); // Alerta de Vibração ao Zerar o descanso
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [cronometroAtivo, tempoDescanso]);

  // Effect Timer Livre
  useEffect(() => {
    let intervalo = null;
    if (cronometroLivreAtivo) {
      intervalo = setInterval(() => setTempoLivre((prev) => prev + 1), 1000);
    } else {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [cronometroLivreAtivo]);

  const registrarSerie = () => {
    if (!carga || !repeticoes) return;

    const novaSerie = {
      id: Date.now().toString(),
      exercicio: exercicioSelecionado.nome,
      carga: parseFloat(carga) || 0,
      repeticoes: parseInt(repeticoes) || 0,
      data: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setHistorico([novaSerie, ...historico]);
    setCarga('');
    setRepeticoes('');

    setTempoDescanso(tempoPadraoDescanso);
    setCronometroAtivo(true);
  };

  const adicionarNovoExercicio = () => {
    if (!novoNome) return;

    const novo = {
      id: Date.now().toString(),
      nome: novoNome,
      detalhes: novoDetalhe || 'Personalizado',
      fotoUrl: novaFotoUrl,
      videoInstrutor: novoVideoUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(novoNome)}+como+fazer`,
    };

    setTreinos({
      ...treinos,
      [treinoAtivo]: {
        ...treinos[treinoAtivo],
        exercicios: [...treinos[treinoAtivo].exercicios, novo]
      }
    });

    setNovoNome('');
    setNovoDetalhe('');
    setNovaFotoUrl('');
    setNovoVideoUrl('');
    setModalVisivel(false);
  };

  const salvarFotoManual = () => {
    if (exercicioSelecionado) {
      const treinosAtualizados = { ...treinos };
      const exIndex = treinosAtualizados[treinoAtivo].exercicios.findIndex(e => e.id === exercicioSelecionado.id);
      if (exIndex !== -1) {
        treinosAtualizados[treinoAtivo].exercicios[exIndex].fotoUrl = inputFotoManual;
        setTreinos(treinosAtualizados);
        setExercicioSelecionado({ ...exercicioSelecionado, fotoUrl: inputFotoManual });
      }
    }
    setInputFotoManual('');
    setModalFotoVisivel(false);
  };

  // Cálculos de Progresso
  const volumeTotalCarga = historico.reduce((acc, item) => acc + (item.carga * item.repeticoes), 0);
  const totalSeriesConcluidas = historico.length;
  
  // Recorde Pessoal (PR) e Estimativa de 1RM (Epley: Carga * (1 + Reps/30))
  const seriesDoExercicio = exercicioSelecionado ? historico.filter(h => h.exercicio === exercicioSelecionado.nome) : [];
  const maiorCargaExercicio = seriesDoExercicio.length > 0 ? Math.max(...seriesDoExercicio.map(h => h.carga)) : 0;
  const melhorSerie = seriesDoExercicio.length > 0 ? seriesDoExercicio.reduce((prev, curr) => (curr.carga > prev.carga ? curr : prev)) : null;
  const estimativa1RM = melhorSerie ? Math.round(melhorSerie.carga * (1 + melhorSerie.repeticoes / 30)) : 0;

  // Definição das Cores do Tema Dinâmico
  const theme = {
    bg: modoNoturno ? '#121214' : '#F4F4F9',
    card: modoNoturno ? '#202024' : '#FFFFFF',
    text: modoNoturno ? '#FFFFFF' : '#121214',
    subText: modoNoturno ? '#82828C' : '#666666',
    border: modoNoturno ? '#29292E' : '#E0E0E0',
    primary: '#FF6B00',
    inputBg: modoNoturno ? '#121214' : '#F0F0F5',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={modoNoturno ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      {/* Header DIEGO GYM */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: theme.primary }]}>DIEGO GYM ⚡</Text>
          <Text style={[styles.headerSubtitle, { color: theme.subText }]}>FOCO & PROGRESSÃO DE CARGA</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity 
            style={[styles.btnHeaderIcon, { backgroundColor: theme.card, borderColor: theme.border, marginRight: 8 }]} 
            onPress={() => setModalProgressoVisivel(true)}
          >
            <Text style={styles.btnConfigText}>📊</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.btnHeaderIcon, { backgroundColor: theme.card, borderColor: theme.border }]} 
            onPress={() => setModalConfigVisivel(true)}
          >
            <Text style={styles.btnConfigText}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* TELA 1: LISTA DE EXERCÍCIOS */}
      {!exercicioSelecionado ? (
        <View style={styles.section}>
          {/* Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
            {Object.keys(treinos).map((key) => (
              <TouchableOpacity
                key={key}
                style={[styles.tab, { backgroundColor: theme.card, borderColor: theme.border }, treinoAtivo === key && styles.tabAtiva]}
                onPress={() => setTreinoAtivo(key)}
              >
                <Text style={[styles.tabTexto, { color: theme.subText }, treinoAtivo === key && styles.tabTextoAtivo]}>
                  {key}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Banner Treino do Dia */}
          <View style={[styles.bannerTreino, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTag}>{treinoAtivo.toUpperCase()}</Text>
              <Text style={[styles.bannerTitle, { color: theme.text }]}>{treinos[treinoAtivo].foco}</Text>
              {volumeTotalCarga > 0 && (
                <Text style={{ color: theme.primary, fontSize: 11, fontWeight: 'bold', marginTop: 4 }}>
                  🔥 Volume total hoje: {volumeTotalCarga} kg
                </Text>
              )}
            </View>
            <TouchableOpacity 
              style={styles.btnAdicionar}
              onPress={() => setModalVisivel(true)}
            >
              <Text style={styles.btnAdicionarTexto}>+ EXERCÍCIO</Text>
            </TouchableOpacity>
          </View>

          {/* Lista de Exercícios */}
          <FlatList
            data={treinos[treinoAtivo].exercicios}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const seriesFeitasCount = historico.filter(h => h.exercicio === item.nome).length;
              return (
                <TouchableOpacity 
                  style={[styles.cardExercicio, { backgroundColor: theme.card, borderColor: theme.border }]}
                  onPress={() => setExercicioSelecionado(item)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.thumbnailContainer, { backgroundColor: theme.inputBg, borderColor: theme.border }]}>
                    {item.fotoUrl ? (
                      <Image source={{ uri: item.fotoUrl }} style={styles.thumbnail} />
                    ) : (
                      <Text style={{ fontSize: 22 }}>🏋️</Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.nomeExercicio, { color: theme.text }]}>{index + 1}. {item.nome}</Text>
                    <Text style={[styles.detalheExercicio, { color: theme.subText }]}>{item.detalhes}</Text>
                    
                    {/* Check-off Visual de Séries */}
                    <View style={styles.rowCheckoff}>
                      {[1, 2, 3, 4].map((s) => (
                        <View 
                          key={s} 
                          style={[
                            styles.dotSeries, 
                            { backgroundColor: s <= seriesFeitasCount ? '#34C759' : theme.border }
                          ]} 
                        />
                      ))}
                      {seriesFeitasCount > 0 && (
                        <Text style={{ color: '#34C759', fontSize: 10, fontWeight: 'bold', marginLeft: 6 }}>
                          {seriesFeitasCount} séries concluídas
                        </Text>
                      )}
                    </View>
                  </View>
                  <Text style={styles.setaCard}>›</Text>
                </TouchableOpacity>
              );
            }}
          />

          {/* Botão Concluir Treino */}
          <TouchableOpacity 
            style={styles.btnFinalizarTreino}
            onPress={() => setModalFinalizadoVisivel(true)}
          >
            <Text style={styles.btnFinalizarTreinoTexto}>⚡ CONCLUIR TREINO DO DIA</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* TELA 2: EXECUÇÃO DO EXERCÍCIO */
        <ScrollView style={styles.section} showsVerticalScrollIndicator={false}>
          <TouchableOpacity 
            style={styles.btnVoltar} 
            onPress={() => setExercicioSelecionado(null)}
          >
            <Text style={styles.btnVoltarTexto}>← Voltar para {treinoAtivo}</Text>
          </TouchableOpacity>

          <Text style={[styles.subHeader, { color: theme.text }]}>{exercicioSelecionado.nome}</Text>
          <Text style={[styles.detalheExercicioTag, { color: theme.subText }]}>{exercicioSelecionado.detalhes}</Text>

          {/* Recorde Pessoal & Estimativa 1RM */}
          <View style={[styles.cardPR, { backgroundColor: theme.card, borderColor: theme.primary }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ color: theme.primary, fontWeight: '900', fontSize: 10, letterSpacing: 1 }}>🏆 MAIOR CARGA (PR)</Text>
                <Text style={{ color: theme.text, fontSize: 18, fontWeight: '900', marginTop: 2 }}>
                  {maiorCargaExercicio > 0 ? `${maiorCargaExercicio} KG` : 'Nenhum peso'}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: theme.subText, fontWeight: '900', fontSize: 10, letterSpacing: 1 }}>🚀 1RM ESTIMADO</Text>
                <Text style={{ color: theme.primary, fontSize: 18, fontWeight: '900', marginTop: 2 }}>
                  {estimativa1RM > 0 ? `~${estimativa1RM} KG` : '--'}
                </Text>
              </View>
            </View>
          </View>

          {/* Foto */}
          <View style={[styles.fotoContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
            {exercicioSelecionado.fotoUrl ? (
              <Image source={{ uri: exercicioSelecionado.fotoUrl }} style={styles.fotoGrande} />
            ) : (
              <View style={styles.fotoPlaceholder}>
                <Text style={{ fontSize: 40, marginBottom: 8 }}>🏋️</Text>
                <Text style={{ color: theme.subText, fontSize: 12 }}>Nenhuma foto adicionada ainda</Text>
              </View>
            )}
          </View>

          {/* Botões do Exercício */}
          <TouchableOpacity 
            style={[styles.btnMudarFoto, { backgroundColor: theme.card, borderColor: theme.border }]}
            onPress={() => { setInputFotoManual(exercicioSelecionado.fotoUrl || ''); setModalFotoVisivel(true); }}
          >
            <Text style={[styles.btnMudarFotoTexto, { color: theme.text }]}>📷 ALTERAR/COLOCAR FOTO DO EXERCÍCIO</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnVideoInstrutor}
            onPress={() => Linking.openURL(exercicioSelecionado.videoInstrutor)}
            activeOpacity={0.8}
          >
            <Text style={styles.btnVideoInstrutorTexto}>🎥 VER VÍDEO DO INSTRUTOR (AULA)</Text>
          </TouchableOpacity>

          {/* Cronômetro Descanso */}
          {tempoDescanso > 0 && (
            <View style={styles.boxCronometro}>
              <Text style={styles.textoCronometroTitle}>DESCANSO RESTANTE</Text>
              <Text style={styles.textoCronometro}>⏱️ {tempoDescanso}s</Text>
            </View>
          )}

          {/* Cronômetro Livre (Pranchas/Flexível) */}
          <View style={[styles.boxTimerLivre, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={{ color: theme.subText, fontSize: 10, fontWeight: 'bold' }}>⏱️ CRONÔMETRO LIVRE (PRANCHAS)</Text>
            <Text style={{ color: theme.text, fontSize: 22, fontWeight: 'bold', marginVertical: 4 }}>{tempoLivre}s</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity 
                style={[styles.btnTimerCtrl, { backgroundColor: cronometroLivreAtivo ? '#FF3B30' : '#34C759' }]}
                onPress={() => setCronometroLivreAtivo(!cronometroLivreAtivo)}
              >
                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 11 }}>{cronometroLivreAtivo ? 'PAUSAR' : 'INICIAR'}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.btnTimerCtrl, { backgroundColor: theme.inputBg }]}
                onPress={() => { setCronometroLivreAtivo(false); setTempoLivre(0); }}
              >
                <Text style={{ color: theme.text, fontWeight: 'bold', fontSize: 11 }}>ZERAR</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form */}
          <View style={[styles.formCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.formCardTitle, { color: theme.text }]}>REGISTRAR SÉRIE</Text>
            
            <View style={styles.formRow}>
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.subText }]}>CARGA (KG)</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text }]}
                  keyboardType="numeric"
                  placeholder="00"
                  placeholderTextColor="#666"
                  value={carga}
                  onChangeText={setCarga}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.subText }]}>REPETIÇÕES</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text }]}
                  keyboardType="numeric"
                  placeholder="00"
                  placeholderTextColor="#666"
                  value={repeticoes}
                  onChangeText={setRepeticoes}
                />
              </View>
            </View>

            <TouchableOpacity 
              style={styles.btnSalvar} 
              onPress={registrarSerie}
              activeOpacity={0.8}
            >
              <Text style={styles.btnSalvarTexto}>CONCLUIR SÉRIE & DESCANSER ({tempoPadraoDescanso}s)</Text>
            </TouchableOpacity>
          </View>

          {/* Histórico */}
          <Text style={[styles.historicoTitulo, { color: theme.subText }]}>SÉRIES DE HOJE</Text>
          {seriesDoExercicio.length === 0 ? (
            <Text style={styles.semHistorico}>Nenhuma série registrada ainda.</Text>
          ) : (
            seriesDoExercicio.map((item, i) => (
              <View key={item.id} style={[styles.itemHistorico, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <View style={styles.badgeSerie}>
                  <Text style={styles.badgeSerieTexto}>#{i + 1}</Text>
                </View>
                <Text style={[styles.textoSerie, { color: theme.text }]}>{item.carga} kg × {item.repeticoes} reps</Text>
                <Text style={[styles.horaHistorico, { color: theme.subText }]}>{item.data}</Text>
              </View>
            ))
          )}
        </ScrollView>
      )}

      {/* MODAL TREINO CONCLUÍDO 🎉 */}
      <Modal visible={modalFinalizadoVisivel} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card, borderColor: theme.border, alignItems: 'center' }]}>
            <Text style={{ fontSize: 50, marginBottom: 10 }}>🎉</Text>
            <Text style={[styles.modalTitulo, { color: theme.text, textAlign: 'center' }]}>TREINO FINALIZADO!</Text>
            <Text style={{ color: theme.subText, textAlign: 'center', marginBottom: 20 }}>
              Excelente trabalho hoje no {treinoAtivo}!
            </Text>

            <View style={{ width: '100%', backgroundColor: theme.inputBg, padding: 15, borderRadius: 10, marginBottom: 20 }}>
              <Text style={{ color: theme.text, fontWeight: 'bold', marginBottom: 5 }}>📊 Resumo da Sessão:</Text>
              <Text style={{ color: theme.subText }}>• Séries Concluídas: <Text style={{ color: theme.primary, fontWeight: 'bold' }}>{totalSeriesConcluidas}</Text></Text>
              <Text style={{ color: theme.subText }}>• Carga Movimentada: <Text style={{ color: theme.primary, fontWeight: 'bold' }}>{volumeTotalCarga} kg</Text></Text>
            </View>

            <TouchableOpacity 
              style={[styles.btnModal, { backgroundColor: '#FF6B00', width: '100%' }]}
              onPress={() => setModalFinalizadoVisivel(false)}
            >
              <Text style={{ color: '#000', fontWeight: 'bold' }}>FECHAR & DESCANAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL PAINEL DE PROGRESSO 📊 */}
      <Modal visible={modalProgressoVisivel} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.modalTitulo, { color: theme.text }]}>📊 MEU PROGRESSO (DIEGO GYM)</Text>

            <View style={styles.gridStats}>
              <View style={[styles.cardStat, { backgroundColor: theme.inputBg, borderColor: theme.border }]}>
                <Text style={{ fontSize: 24 }}>⚡</Text>
                <Text style={[styles.statValor, { color: theme.primary }]}>{totalSeriesConcluidas}</Text>
                <Text style={[styles.statLabel, { color: theme.subText }]}>SÉRIES TOTAIS</Text>
              </View>

              <View style={[styles.cardStat, { backgroundColor: theme.inputBg, borderColor: theme.border }]}>
                <Text style={{ fontSize: 24 }}>🏋️</Text>
                <Text style={[styles.statValor, { color: theme.primary }]}>{volumeTotalCarga} kg</Text>
                <Text style={[styles.statLabel, { color: theme.subText }]}>CARGA MOVIDA</Text>
              </View>
            </View>

            <View style={[styles.cardStatusEV, { backgroundColor: theme.inputBg, borderColor: theme.border, marginTop: 15 }]}>
              <Text style={{ color: theme.subText, fontSize: 10, fontWeight: 'bold' }}>STATUS DE EVOLUÇÃO:</Text>
              <Text style={{ color: theme.primary, fontSize: 16, fontWeight: '900', marginTop: 2 }}>
                {totalSeriesConcluidas > 10 ? '🔥 EM CONSTANTE EVOLUÇÃO!' : '🌱 INICIANDO A JORNADA'}
              </Text>
            </View>

            <View style={styles.modalBotoes}>
              <TouchableOpacity style={[styles.btnModal, { backgroundColor: '#FF6B00', flex: 1 }]} onPress={() => setModalProgressoVisivel(false)}>
                <Text style={{ color: '#000', fontWeight: 'bold' }}>FECHAR PAINEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL CONFIGURAÇÕES ⚙️ */}
      <Modal visible={modalConfigVisivel} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.modalTitulo, { color: theme.text }]}>⚙️ CONFIGURAÇÕES</Text>

            <View style={styles.rowSettingSwitch}>
              <Text style={[styles.label, { color: theme.text, fontSize: 13, marginBottom: 0 }]}>MODO NOTURNO (DARK MODE)</Text>
              <Switch 
                value={modoNoturno} 
                onValueChange={setModoNoturno}
                trackColor={{ false: '#767577', true: '#FF6B00' }}
                thumbColor={modoNoturno ? '#FFFFFF' : '#f4f3f4'}
              />
            </View>

            <Text style={[styles.label, { color: theme.subText, marginTop: 15 }]}>TEMPO DE DESCANSO PADRÃO:</Text>
            <View style={styles.rowOpcoesDescanso}>
              {[45, 60, 90, 120].map((tempo) => (
                <TouchableOpacity
                  key={tempo}
                  style={[styles.btnTempoDescanso, { backgroundColor: theme.inputBg, borderColor: theme.border }, tempoPadraoDescanso === tempo && styles.btnTempoAtivo]}
                  onPress={() => setTempoPadraoDescanso(tempo)}
                >
                  <Text style={[styles.txtTempoDescanso, { color: theme.text }, tempoPadraoDescanso === tempo && { color: '#000' }]}>
                    {tempo}s
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={[styles.btnActionModal, { backgroundColor: '#FF3B301A', borderColor: '#FF3B30', marginTop: 10 }]}
              onPress={() => { setHistorico([]); setModalConfigVisivel(false); }}
            >
              <Text style={{ color: '#FF3B30', fontWeight: 'bold' }}>🗑️ ZERAR SÉRIES DE HOJE</Text>
            </TouchableOpacity>

            <Text style={[styles.txtVersaoApp, { color: theme.subText }]}>Versão do App: v0.0.0.1</Text>

            <View style={styles.modalBotoes}>
              <TouchableOpacity style={[styles.btnModal, { backgroundColor: '#FF6B00', flex: 1 }]} onPress={() => setModalConfigVisivel(false)}>
                <Text style={{ color: '#000', fontWeight: 'bold' }}>FECHAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL ADICIONAR / EDITAR FOTO */}
      <Modal visible={modalFotoVisivel} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.modalTitulo, { color: theme.text }]}>📷 COLOCAR FOTO DO EXERCÍCIO</Text>
            <Text style={[styles.label, { color: theme.subText }]}>COLE O LINK DA IMAGEM (URL):</Text>
            <TextInput 
              style={[styles.inputModal, { backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text }]} 
              placeholder="https://sua-imagem.com/foto.jpg" 
              placeholderTextColor="#666"
              value={inputFotoManual} 
              onChangeText={setInputFotoManual} 
            />
            <View style={styles.modalBotoes}>
              <TouchableOpacity style={[styles.btnModal, { backgroundColor: '#2A2A2E' }]} onPress={() => setModalFotoVisivel(false)}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>CANCELAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnModal, { backgroundColor: '#FF6B00' }]} onPress={salvarFotoManual}>
                <Text style={{ color: '#000', fontWeight: 'bold' }}>SALVAR FOTO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL ADICIONAR EXERCÍCIO */}
      <Modal visible={modalVisivel} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.modalTitulo, { color: theme.text }]}>NOVO EXERCÍCIO</Text>

            <Text style={[styles.label, { color: theme.subText }]}>NOME DO EXERCÍCIO</Text>
            <TextInput style={[styles.inputModal, { backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text }]} placeholder="Ex: Crucifixo Inclinado" placeholderTextColor="#666" value={novoNome} onChangeText={setNovoNome} />

            <Text style={[styles.label, { color: theme.subText }]}>DETALHES / REPS</Text>
            <TextInput style={[styles.inputModal, { backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text }]} placeholder="Ex: 3 séries × 10 reps" placeholderTextColor="#666" value={novoDetalhe} onChangeText={setNovoDetalhe} />

            <Text style={[styles.label, { color: theme.subText }]}>LINK DA FOTO (OPCIONAL)</Text>
            <TextInput style={[styles.inputModal, { backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text }]} placeholder="https://..." placeholderTextColor="#666" value={novaFotoUrl} onChangeText={setNovaFotoUrl} />

            <Text style={[styles.label, { color: theme.subText }]}>LINK VÍDEO INSTRUTOR</Text>
            <TextInput style={[styles.inputModal, { backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text }]} placeholder="https://..." placeholderTextColor="#666" value={novoVideoUrl} onChangeText={setNovoVideoUrl} />

            <View style={styles.modalBotoes}>
              <TouchableOpacity style={[styles.btnModal, { backgroundColor: '#2A2A2E' }]} onPress={() => setModalVisivel(false)}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>CANCELAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnModal, { backgroundColor: '#FF6B00' }]} onPress={adicionarNovoExercicio}>
                <Text style={{ color: '#000', fontWeight: 'bold' }}>SALVAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, marginTop: 10 },
  headerTitle: { fontSize: 22, fontWeight: '900', letterSpacing: 1 },
  headerSubtitle: { fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  btnHeaderIcon: { width: 42, height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  btnConfigText: { fontSize: 18 },
  tabsContainer: { flexDirection: 'row', marginBottom: 15, maxHeight: 42 },
  tab: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20, marginRight: 8, borderWidth: 1 },
  tabAtiva: { backgroundColor: '#FF6B00', borderColor: '#FF6B00' },
  tabTexto: { fontWeight: 'bold', fontSize: 13 },
  tabTextoAtivo: { color: '#000' },
  bannerTreino: { padding: 16, borderRadius: 12, marginBottom: 15, flexDirection: 'row', alignItems: 'center', borderWidth: 1 },
  bannerTag: { color: '#FF6B00', fontSize: 11, fontWeight: 'bold', letterSpacing: 1, marginBottom: 4 },
  bannerTitle: { fontSize: 18, fontWeight: 'bold' },
  btnAdicionar: { backgroundColor: '#FF6B001A', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#FF6B00' },
  btnAdicionarTexto: { color: '#FF6B00', fontWeight: 'bold', fontSize: 11 },
  section: { flex: 1 },
  cardExercicio: { flexDirection: 'row', padding: 12, borderRadius: 12, marginBottom: 10, alignItems: 'center', borderWidth: 1 },
  thumbnailContainer: { width: 55, height: 55, borderRadius: 8, marginRight: 12, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderWidth: 1 },
  thumbnail: { width: '100%', height: '100%', resizeMode: 'cover' },
  nomeExercicio: { fontSize: 15, fontWeight: 'bold' },
  detalheExercicio: { fontSize: 12, marginTop: 2 },
  rowCheckoff: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  dotSeries: { width: 8, height: 8, borderRadius: 4, marginRight: 4 },
  setaCard: { fontSize: 22, color: '#FF6B00', fontWeight: 'bold', marginLeft: 8 },
  btnFinalizarTreino: { backgroundColor: '#34C759', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 10 },
  btnFinalizarTreinoTexto: { color: '#FFF', fontWeight: '900', fontSize: 13, letterSpacing: 1 },
  btnVoltar: { marginBottom: 15 },
  btnVoltarTexto: { color: '#FF6B00', fontWeight: 'bold', fontSize: 14 },
  subHeader: { fontSize: 22, fontWeight: 'bold' },
  detalheExercicioTag: { fontSize: 13, marginBottom: 10 },
  cardPR: { padding: 12, borderRadius: 8, borderWidth: 1, marginBottom: 12 },
  fotoContainer: { borderRadius: 12, overflow: 'hidden', borderWidth: 1, marginBottom: 10, minHeight: 180 },
  fotoGrande: { width: '100%', height: 200, resizeMode: 'cover' },
  fotoPlaceholder: { height: 180, justifyContent: 'center', alignItems: 'center' },
  btnMudarFoto: { padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 10, borderWidth: 1 },
  btnMudarFotoTexto: { fontSize: 11, fontWeight: 'bold' },
  btnVideoInstrutor: { backgroundColor: '#FF6B00', padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  btnVideoInstrutorTexto: { color: '#000', fontWeight: '900', fontSize: 12, letterSpacing: 0.5 },
  boxCronometro: { backgroundColor: '#FF6B00', padding: 12, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  textoCronometroTitle: { color: '#000', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  textoCronometro: { color: '#000', fontSize: 22, fontWeight: '900' },
  boxTimerLivre: { padding: 12, borderRadius: 10, borderWidth: 1, marginBottom: 15 },
  btnTimerCtrl: { flex: 0.48, padding: 8, borderRadius: 6, alignItems: 'center' },
  formCard: { padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 20 },
  formCardTitle: { fontSize: 12, fontWeight: 'bold', letterSpacing: 1, marginBottom: 12 },
  formRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  inputGroup: { width: '48%' },
  label: { fontSize: 10, fontWeight: 'bold', marginBottom: 6, letterSpacing: 1 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  btnSalvar: { backgroundColor: '#FF6B00', padding: 14, borderRadius: 8, alignItems: 'center' },
  btnSalvarTexto: { color: '#000', fontSize: 13, fontWeight: '900', letterSpacing: 0.5 },
  historicoTitulo: { fontSize: 12, fontWeight: 'bold', letterSpacing: 1, marginBottom: 10 },
  semHistorico: { color: '#555', fontStyle: 'italic', marginBottom: 20 },
  itemHistorico: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 8, marginBottom: 8, borderWidth: 1 },
  badgeSerie: { backgroundColor: '#FF6B0022', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginRight: 10 },
  badgeSerieTexto: { color: '#FF6B00', fontWeight: 'bold', fontSize: 12 },
  textoSerie: { flex: 1, fontWeight: 'bold', fontSize: 14 },
  horaHistorico: { fontSize: 11 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', padding: 20 },
  modalContent: { padding: 20, borderRadius: 12, borderWidth: 1 },
  modalTitulo: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, letterSpacing: 1 },
  inputModal: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
  rowSettingSwitch: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  rowOpcoesDescanso: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  btnTempoDescanso: { flex: 0.22, paddingVertical: 10, borderRadius: 8, alignItems: 'center', borderWidth: 1 },
  btnTempoAtivo: { backgroundColor: '#FF6B00', borderColor: '#FF6B00' },
  txtTempoDescanso: { fontWeight: 'bold', fontSize: 12 },
  btnActionModal: { padding: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1, marginBottom: 10 },
  txtVersaoApp: { textAlign: 'center', fontSize: 11, fontStyle: 'italic', marginBottom: 10, marginTop: 5 },
  gridStats: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  cardStat: { flex: 0.48, padding: 15, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  statValor: { fontSize: 18, fontWeight: '900', marginVertical: 4 },
  statLabel: { fontSize: 10, fontWeight: 'bold' },
  cardStatusEV: { padding: 15, borderRadius: 10, borderWidth: 1, marginBottom: 15 },
  modalBotoes: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  btnModal: { flex: 0.48, padding: 14, borderRadius: 8, alignItems: 'center' }
});
