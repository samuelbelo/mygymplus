<template>
  <v-container fluid>
    <v-container class="">
      <v-row class="">
        <v-col class="mb-4">
          <v-card :loading="loadingData">
            <v-card-title class="text-left text-subtitle-1">{{ instrutorObj.dadosPessoais.nomeCompleto }}</v-card-title>
            <v-card-subtitle class="text-left">{{ instrutorObj.dadosPessoais.apelido }} -
              {{ instrutorObj.dadosPessoais.idade }}
              anos
              <br/>
            </v-card-subtitle>
            <v-card-text>
              <h3 class="text-left">Alunos</h3>
              <v-list
                  density="compact"
                  class="text-left"
                  lines="three">
                <v-list-item
                    rounded="xl"
                    v-for="(aluno, i) of dataAlunos"
                    :key="i"
                    :value="aluno"
                    active-color="primary"
                    @click="selectAluno(i)">
                  <v-list-item-title v-text="aluno.title"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
          <v-card></v-card>
        </v-col>
      </v-row>
      <v-dialog
          v-model="dialogAluno"
          fullscreen
          :scrim="false"
          transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar
              dark
              color="primary">
            <v-btn
                icon
                dark
                @click="toggleDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ alunoSelecionado.dadosPessoais.nomeCompleto }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-card class="mb-5">
              <v-card-title>Ficha do aluno</v-card-title>

              <v-card-text>
                <h3 class="mb-n4">{{alunoSelecionado.dadosPessoais.apelido}}</h3><br>
                <h3 class="mb-n4">Nasc: {{formatDate(alunoSelecionado.dadosPessoais.dataNascimento)}}</h3><br>
                <h3 class="mb-n4">Idade: {{alunoSelecionado.dadosPessoais.idade}}</h3><br>
                <v-chip
                    class="ma-1"
                    color="primary">
                  {{alunoSelecionado.detalhesFisicos[alunoSelecionado.detalhesFisicos.length - 1].peso}} kg
                </v-chip>
                <v-chip
                    class="ma-1"
                    color="secondary"
                >
                  {{alunoSelecionado.detalhesFisicos[alunoSelecionado.detalhesFisicos.length - 1].percentualGordura}}% Gordura
                </v-chip>
                <v-chip
                    class="ma-1"
                    color="green"
                    text-color="white"
                >
                  Obs: {{alunoSelecionado.detalhesFisicos[alunoSelecionado.detalhesFisicos.length - 1].observacao}}
                </v-chip>
              </v-card-text>
            </v-card>
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-title>Domingo</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <span v-if="!alunoSelecionado.planosExercicios[0].domingo.length">Sem exercícios cadastrados</span>
                  <TableExercicios
                      v-else
                      class="mb-2"
                      v-for="exercicio in alunoSelecionado.planosExercicios[0].domingo"
                      :items="exercicio"
                      :key="exercicio.ordem"/>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-title>Segunda</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <span v-if="!alunoSelecionado.planosExercicios[0].segunda.length">Sem exercícios cadastrados</span>
                  <TableExercicios
                      class="mb-2"
                      v-for="exercicio in alunoSelecionado.planosExercicios[0].segunda"
                      :items="exercicio"
                      :key="exercicio.ordem"/>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-title>Terça</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <span v-if="!alunoSelecionado.planosExercicios[0].terca.length">Sem exercícios cadastrados</span>
                  <TableExercicios
                      class="mb-2"
                      v-for="exercicio in alunoSelecionado.planosExercicios[0].terca"
                      :items="exercicio"
                      :key="exercicio.ordem"/>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-title>Quarta</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <span v-if="!alunoSelecionado.planosExercicios[0].quarta.length">Sem exercícios cadastrados</span>
                  <TableExercicios
                      class="mb-2"
                      v-for="exercicio in alunoSelecionado.planosExercicios[0].quarta"
                      :items="exercicio"
                      :key="exercicio.ordem"/>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-title>Quinta</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <span v-if="!alunoSelecionado.planosExercicios[0].quinta.length">Sem exercícios cadastrados</span>
                  <TableExercicios
                      class="mb-2"
                      v-for="exercicio in alunoSelecionado.planosExercicios[0].quinta"
                      :items="exercicio"
                      :key="exercicio.ordem"/>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-title>Sexta</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <span v-if="!alunoSelecionado.planosExercicios[0].sexta.length">Sem exercícios cadastrados</span>
                  <TableExercicios
                      class="mb-2"
                      v-for="exercicio in alunoSelecionado.planosExercicios[0].sexta"
                      :items="exercicio"
                      :key="exercicio.ordem"/>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-title>Sábado</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <span v-if="!alunoSelecionado.planosExercicios[0].sabado.length">Sem exercícios cadastrados</span>
                  <TableExercicios
                      class="mb-2"
                      v-for="exercicio in alunoSelecionado.planosExercicios[0].sabado"
                      :items="exercicio"
                      :key="exercicio.ordem"/>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </v-container>
</template>

<script>
import api from "../../api/api";
import TableExercicios from "../../components/TableExercicios.vue";
export default {
  name: "Instrutor",
  components: {
    TableExercicios
  },
  data() {
    return {
      labels: [
        '12am',
        '3am',
        '6am',
        '9am',
        '12pm',
        '3pm',
        '6pm',
        '9pm',
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240,
      ],
      alunoSelecionado: {},
      dialogAluno: false,
      loadingData: false,
      instrutorObj: {
        dadosPessoais: {
          nomeCompleto: "string",
          apelido: "string",
          dataNascimento: "2022-10-12T20:47:09.271Z",
          idade: 0
        },
        alunos: [
          {
            dadosPessoais: {
              nomeCompleto: "string",
              apelido: "string",
              dataNascimento: "2022-10-12T20:47:09.271Z",
              idade: 0
            },
            planosExercicios: [
              {
                domingo: [
                  {
                    ordem: 0,
                    nomeExercicio: "string",
                    quantidadeDeSeries: 0,
                    quantidadeDeRepeticoes: 0,
                    carga: 0,
                    observacaoAluno: "string",
                    observacaoInstrutor: "string"
                  }
                ],
                segunda: [
                  {
                    ordem: 0,
                    nomeExercicio: "string",
                    quantidadeDeSeries: 0,
                    quantidadeDeRepeticoes: 0,
                    carga: 0,
                    observacaoAluno: "string",
                    observacaoInstrutor: "string"
                  }
                ],
                terca: [
                  {
                    ordem: 0,
                    nomeExercicio: "string",
                    quantidadeDeSeries: 0,
                    quantidadeDeRepeticoes: 0,
                    carga: 0,
                    observacaoAluno: "string",
                    observacaoInstrutor: "string"
                  }
                ],
                quarta: [
                  {
                    ordem: 0,
                    nomeExercicio: "string",
                    quantidadeDeSeries: 0,
                    quantidadeDeRepeticoes: 0,
                    carga: 0,
                    observacaoAluno: "string",
                    observacaoInstrutor: "string"
                  }
                ],
                quinta: [
                  {
                    ordem: 0,
                    nomeExercicio: "string",
                    quantidadeDeSeries: 0,
                    quantidadeDeRepeticoes: 0,
                    carga: 0,
                    observacaoAluno: "string",
                    observacaoInstrutor: "string"
                  }
                ],
                sexta: [
                  {
                    ordem: 0,
                    nomeExercicio: "string",
                    quantidadeDeSeries: 0,
                    quantidadeDeRepeticoes: 0,
                    carga: 0,
                    observacaoAluno: "string",
                    observacaoInstrutor: "string"
                  }
                ],
                sabado: [
                  {
                    ordem: 0,
                    nomeExercicio: "string",
                    quantidadeDeSeries: 0,
                    quantidadeDeRepeticoes: 0,
                    carga: 0,
                    observacaoAluno: "string",
                    observacaoInstrutor: "string"
                  }
                ]
              }
            ],
            detalhesFisicos: [
              {
                peso: 0,
                percentualGordura: 0,
                observacao: "string",
                dataHoraCadastro: "2022-10-12T20:47:09.271Z"
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    formatDate(date) {
      let formatedDate = new Date(date)
      return new Intl.DateTimeFormat('pt-BR').format(formatedDate)
    },
    selectAluno(aluno) {
      this.alunoSelecionado = this.instrutorObj.alunos[aluno]
      console.log(this.alunoSelecionado)
      this.toggleDialog()

    },
    toggleDialog() {
      this.dialogAluno = !this.dialogAluno
    },
    async getDadosInstrutor() {
      this.loadingData = true
      await api({requiresAuth: true})
          .get("https://minha-academia-plus-api.azurewebsites.net/instrutor")
          .then(({data}) => {
            //@ts-ignore
            this.instrutorObj = data;
          })
          .finally(() => {
            this.loadingData = false
          })
    },

  },
  computed: {
    dataAlunos() {
      let alunos = this.instrutorObj.alunos
      alunos = alunos.map(x => {
        return {
          prependAvatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: x.dadosPessoais.nomeCompleto,
          subtitle: `<span class="text-primary">${x.dadosPessoais.idade} anos &mdash; Nasc: ${this.formatDate(x.dadosPessoais.dataNascimento)}</span> &mdash;`
        }
      })
      return alunos
    }
  },
  mounted() {
    this.getDadosInstrutor()
  }
}
</script>

<style scoped>

</style>

<!--<v-expansion-panels>-->
<!--<v-expansion-panel>-->
<!--  <v-expansion-panel-title>Domingo</v-expansion-panel-title>-->
<!--  <v-expansion-panel-text>-->
<!--    <span v-if="!instrutorObj.planosExercicios[0].domingo.length">Sem exercícios cadastrados</span>-->
<!--    <TableExercicios-->
<!--        v-else-->
<!--        class="mb-2"-->
<!--        v-for="exercicio in instrutorObj.planosExercicios[0].domingo"-->
<!--        :items="exercicio"-->
<!--        :key="exercicio.ordem"/>-->
<!--  </v-expansion-panel-text>-->
<!--</v-expansion-panel>-->
<!--<v-expansion-panel>-->
<!--  <v-expansion-panel-title>Segunda</v-expansion-panel-title>-->
<!--  <v-expansion-panel-text>-->
<!--    <span v-if="!instrutorObj.planosExercicios[0].segunda.length">Sem exercícios cadastrados</span>-->
<!--    <TableExercicios-->
<!--        class="mb-2"-->
<!--        v-for="exercicio in instrutorObj.planosExercicios[0].segunda"-->
<!--        :items="exercicio"-->
<!--        :key="exercicio.ordem"/>-->
<!--  </v-expansion-panel-text>-->
<!--</v-expansion-panel>-->
<!--<v-expansion-panel>-->
<!--  <v-expansion-panel-title>Terça</v-expansion-panel-title>-->
<!--  <v-expansion-panel-text>-->
<!--    <span v-if="!instrutorObj.planosExercicios[0].terca.length">Sem exercícios cadastrados</span>-->
<!--    <TableExercicios-->
<!--        class="mb-2"-->
<!--        v-for="exercicio in instrutorObj.planosExercicios[0].terca"-->
<!--        :items="exercicio"-->
<!--        :key="exercicio.ordem"/>-->
<!--  </v-expansion-panel-text>-->
<!--</v-expansion-panel>-->
<!--<v-expansion-panel>-->
<!--  <v-expansion-panel-title>Quarta</v-expansion-panel-title>-->
<!--  <v-expansion-panel-text>-->
<!--    <span v-if="!instrutorObj.planosExercicios[0].quarta.length">Sem exercícios cadastrados</span>-->
<!--    <TableExercicios-->
<!--        class="mb-2"-->
<!--        v-for="exercicio in instrutorObj.planosExercicios[0].quarta"-->
<!--        :items="exercicio"-->
<!--        :key="exercicio.ordem"/>-->
<!--  </v-expansion-panel-text>-->
<!--</v-expansion-panel>-->
<!--<v-expansion-panel>-->
<!--  <v-expansion-panel-title>Quinta</v-expansion-panel-title>-->
<!--  <v-expansion-panel-text>-->
<!--    <span v-if="!instrutorObj.planosExercicios[0].quinta.length">Sem exercícios cadastrados</span>-->
<!--    <TableExercicios-->
<!--        class="mb-2"-->
<!--        v-for="exercicio in instrutorObj.planosExercicios[0].quinta"-->
<!--        :items="exercicio"-->
<!--        :key="exercicio.ordem"/>-->
<!--  </v-expansion-panel-text>-->
<!--</v-expansion-panel>-->
<!--<v-expansion-panel>-->
<!--  <v-expansion-panel-title>Sexta</v-expansion-panel-title>-->
<!--  <v-expansion-panel-text>-->
<!--    <span v-if="!instrutorObj.planosExercicios[0].sexta.length">Sem exercícios cadastrados</span>-->
<!--    <TableExercicios-->
<!--        class="mb-2"-->
<!--        v-for="exercicio in instrutorObj.planosExercicios[0].sexta"-->
<!--        :items="exercicio"-->
<!--        :key="exercicio.ordem"/>-->
<!--  </v-expansion-panel-text>-->
<!--</v-expansion-panel>-->
<!--<v-expansion-panel>-->
<!--  <v-expansion-panel-title>Sábado</v-expansion-panel-title>-->
<!--  <v-expansion-panel-text>-->
<!--    <span v-if="!instrutorObj.planosExercicios[0].sabado.length">Sem exercícios cadastrados</span>-->
<!--    <TableExercicios-->
<!--        class="mb-2"-->
<!--        v-for="exercicio in instrutorObj.planosExercicios[0].sabado"-->
<!--        :items="exercicio"-->
<!--        :key="exercicio.ordem"/>-->
<!--  </v-expansion-panel-text>-->
<!--</v-expansion-panel>-->
<!--</v-expansion-panels>-->