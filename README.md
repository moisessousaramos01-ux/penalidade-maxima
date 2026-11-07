# WEPEMOY APP — v1

Aplicação única, responsiva, com identidade preto/dourado, área pública e painel administrativo restrito. A LEF — Liga Europeia de Futebol permanece como área esportiva dentro do WEPEMOY. Toda a economia é virtual e fictícia: não há pagamentos, cobranças ou integração bancária real.

## Estrutura

- `index.html`: interface pública e painel administrativo.
- `css/style.css`: identidade visual responsiva.
- `js/firebase.js`: inicialização do Firebase existente `lef-os-a8aff`.
- `js/app.js`: autenticação, leitura, cadastros, operações virtuais, premiações, rankings, museu, avisos e auditoria.
- `firestore.rules`: regras do Firestore.
- `storage.rules`: regras do Firebase Storage para escudos, fotos e imagens do museu.
- `netlify.toml`: publicação estática na Netlify.
- `MIGRACAO.md`: compatibilidade com os dados antigos.

## Recursos incluídos

- Área pública sem login: visão geral, times, jogadores, empresas/Bolsa, mercado, competições, resultados, rankings, Museu WEPEMOY e histórico.
- Atalho administrativo secreto: três cliques rápidos no nome WEPEMOY do cabeçalho ou no monograma W da página inicial. Não existe botão ou aba de administração para visitantes.
- Firebase Authentication por e-mail e senha; autorização adicional por `admins/{UID}` com `active: true` e papel `admin`.
- Cadastro, edição e exclusão administrativa de times, empresas, jogadores, competições e registros do museu. A exclusão de time/empresa é bloqueada enquanto houver vínculos ativos.
- Escudos, logos e fotos por URL ou upload para Firebase Storage (limite de 5 MB por imagem).
- Criação de jogador por empresa com débito do custo virtual configurado.
- Compra/transferência/venda entre empresas, taxa de venda, atualização de propriedade e time, histórico e transações.
- Registro de campeão, vice e placar; premiação do clube; valorização e títulos dos jogadores; repasse às empresas proprietárias do elenco campeão.
- Configurações de custo de criação, repasse, valorização coletiva/individual, multiplicador, taxa e premiações.
- Temporada, comunicados, museu, rankings, histórico público e auditoria administrativa.
- Índice WEPEMOY = caixa virtual total das empresas + valor de mercado total dos jogadores ativos.
- Sem geração automática de dados fictícios. A base começa vazia; somente parâmetros padrão ficam disponíveis até serem alterados pelo administrador.

## Firebase — configuração obrigatória

O projeto foi configurado com o identificador `lef-os-a8aff`, com base nos HTMLs fornecidos. Antes de publicar, confirme os valores de `js/firebase.js` em Firebase Console → Configurações do projeto → Seus apps. A configuração web é pública por natureza; nunca coloque chave privada de service account no front-end.

1. No Firebase Console, abra o projeto `lef-os-a8aff`.
2. Em Authentication → Sign-in method, habilite **E-mail/senha**.
3. Em Authentication → Settings → Authorized domains, adicione o domínio `netlify.app` do site e o domínio personalizado, se houver.
4. Crie o banco Firestore em modo de produção.
5. Abra Firestore → Rules, cole o conteúdo de `firestore.rules` e publique.
6. Abra Storage → Rules, cole `storage.rules` e publique. Ative o Firebase Storage e confirme que o bucket configurado em `js/firebase.js` é o correto.
7. Em Authentication → Users, crie o usuário do administrador principal. Copie o UID gerado.
8. No Firestore, crie manualmente a coleção `admins`, com um documento cujo ID seja exatamente o UID. Campos: `active` (boolean `true`), `role` (string `admin`) e `name` (string com o nome do administrador). A aplicação não cria nem promove administradores pelo navegador.
9. Não crie documentos de exemplo. As coleções esportivas e financeiras são criadas pelos primeiros cadastros administrativos.

## Publicar no GitHub

1. Extraia o ZIP.
2. Crie um repositório no GitHub, por exemplo `wepemoy-app`.
3. Envie o conteúdo de dentro da pasta `WEPEMOY-APP` para a raiz do repositório (o `index.html` precisa ficar na raiz).
4. Confirme que os arquivos `index.html`, `netlify.toml`, `firestore.rules` e `storage.rules` aparecem na raiz.

## Publicar no Netlify

1. Entre no Netlify e escolha **Add new site → Import an existing project**.
2. Conecte o GitHub e selecione o repositório.
3. Build command: deixe vazio.
4. Publish directory: `.`
5. Clique em Deploy. Depois, copie o domínio Netlify e inclua-o nos domínios autorizados do Firebase Authentication.

## Primeiro acesso

1. Abra o domínio publicado.
2. Clique três vezes rapidamente em WEPEMOY no cabeçalho ou no monograma W.
3. Entre com o e-mail e senha criados no Firebase Authentication.
4. O sistema consulta `admins/{UID}` diretamente no servidor. Sem documento ativo, o login é encerrado e o painel permanece bloqueado.
5. Cadastre empresas e times, depois jogadores, competições e comunicados. Para criar jogador com empresa proprietária, o custo virtual configurado é debitado da empresa.

## Fórmulas financeiras

- Índice WEPEMOY: soma do caixa virtual das empresas + soma do valor de mercado dos jogadores não aposentados.
- Criação de jogador: debita `creationCost` da empresa criadora.
- Venda: o comprador paga exatamente o valor de mercado atual (o formulário preenche esse valor e o valida); a empresa vendedora recebe o valor menos `saleFee` percentual. A taxa é registrada na transferência e não é creditada a outra entidade.
- Repasse por título: `premiação × (companyShare / 100) × (bônus do jogador × bonusMultiplier)`. O resultado é registrado por jogador na coleção `premiacoes`; os totais são creditados à empresa proprietária.
- Valorização de cada jogador do elenco campeão: `collectiveValue + individualValue`; recebe também um título individual e o histórico da conquista.

## Compatibilidade e dados antigos

A aplicação não apaga nem sobrescreve automaticamente os registros existentes. A leitura considera campos antigos conhecidos (`nome`, `caixa`, `titulos`, `vices`, `empresa`, `timeAtual`, `valor`, `lucratividade`) além dos campos canônicos. As configurações antigas em `config/valores` são lidas apenas após login administrativo, pois documentos antigos podem conter campos de credenciais que não devem ser públicos. O documento legado `museo/principal` é exibido como conteúdo histórico sem ser apagado. Consulte `MIGRACAO.md` antes de qualquer migração manual.

## Segurança e limites importantes da v1

- As regras do Firestore restringem escrita às contas autenticadas com documento `admins/{UID}` ativo. O painel também verifica o documento antes de liberar as telas.
- As operações econômicas desta v1 são executadas no cliente dentro de transações Firestore e protegidas pelas regras de administrador. Como o cliente é controlado pelo navegador, isso **não equivale** a validação de negócio no servidor: para uma economia resistente a adulteração, concorrência abusiva ou chamadas diretas ao Firestore, migre as operações financeiras para Firebase Cloud Functions e passe a negar escrita direta do cliente nas coleções financeiras. O usuário definiu que Cloud Functions não serão ativadas nesta v1.
- As regras não permitem que o navegador crie ou altere documentos da coleção `admins`.
- O atalho secreto apenas oculta a entrada; não é uma camada de segurança. A proteção real é Firebase Authentication + documento `admins` + regras.
- Este pacote contém o código e as regras, mas não pode ativar serviços no projeto Firebase, criar o administrador, verificar a propriedade do projeto, publicar no GitHub/Netlify ou executar testes autenticados sem acesso à sua conta. Faça o checklist acima e valide os fluxos no seu projeto antes de abrir a temporada oficial.
- O reset global não é disponibilizado no navegador, para evitar apagamento acidental de dados.

## Observação

O ZIP é o pacote de implementação da v1 conforme o relatório fornecido. Nenhuma informação financeira representa dinheiro real.
