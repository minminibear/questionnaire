import { useForm, Controller } from "react-hook-form";
import { Container, Input } from "@material-ui/core";
import firebase from "./config/firebase";

export default function Home () {
  const { register, handleSubmit, watch, formState: { errors }, control } = useForm({
  });

  // 入力されたデータ
  const onSubmit = (data) => {
    console.log(data);
    // e.preventDefault() //ページがリロードされないようにする
    firebase.firestore()
      .collection('answer')
      .add(data)
  }
  //↑ただのReactの場合は　addの中は firestoreで作成してコレクションと紐付けしていたが、
  // 今回の場合は、React-hook-formを使用しdataがオブジェクト形式のため、こちらをそのまま使用すればOK

  // 引数に渡した名前の入力値を監視する　=> 最適なレンダリングができる
  const watch1= watch(["nowStudy", "thePastStudy"]);
  // console.log(watch1);

  // ↓データベースに保存した情報を表示させたい時に使用するため、今回は不要
  // ↓使用する場合、useStateをimportしてuseStateを宣言して使用する
  // React hookの機能でstateなどの機能をクラスを書かずに使える
  // useEffect(() => {
  //   firebase.firestore() // firebase.firestoreメソッドを実行してインスタンスを取得
  //   .collection('answer') // collectionメソッドを呼び出しデータの各メソッドを実行
  //   .onSnapshot((snapshot) => { //onSnapshotメソッドを呼び出してsnapshotイベントハンドラーを設定
  //     const answer = snapshot.docs.map(doc => {
  //       return { ...doc.data(), id: doc.id }
  //     })
  //     setAnswer(answer)
  //     console.log(answer);
  //   })
  // }, [])

// onSnapshotの引数として渡されるオブジェクトはQuerySnapshot オブジェクトで
// ドキュメントの配列ではないため、 docs プロパティを参照する。
//　docsは配列だが、取得したいドキュメントの配列ではなく、QueryDocumentSnapshot の配列
// ドキュメントのデータのみを抽出するにはdataメソッドを実行する
// snapshotイベントは対象のコレクション(今回はanswer)に変更がある度に発生するため、リアルタイムでデータを反映

  // // 送信された時の関数
  // const onSubmit = (e) => {
  //   e.preventDefault() //ページがリロードされないようにする
  // }

  return (
    <>
      <Container maxWidth="md">
      <h1>プログラミング学習に関するアンケート</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Q1. 名前を入力してください（匿名可）。</label>
            <Controller
              name="name"
              defaultValue=""
              control={control}
              render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />}
              />
          </div>

          <div>
            <label htmlFor="birth">Q2. 生年月日を入力してください(例: 19900101)</label>
            <Controller
              name="birth"
              defaultValue=""
              control={control}
              rules={{ required: true, pattern: /^[0-9]{8}$/ }}
              // {...register("birth", { required: true, pattern: /^[0-9]{8}$/ })} 
              render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />}
            />
            {errors.birth && errors.birth.type === "required" ?
              <span style={{ color: "red" }}>このフィールドは回答必須です。</span>: null
            }
            {errors.birth && errors.birth.type === "pattern" ?
              <span style={{ color: "red" }}>整数8桁で入力してください。</span>: null
            }

          </div>

          <div>
            <span>Q3. 現在、プログラミングを学習していますか？</span>
            <input
            id="nowStudy1"
            name="nowStudy"
            type="radio"
            value="yes"
            {...register("nowStudy", { required: true })}
            />
            <label htmlFor="nowStudy">はい</label>

            <input
            id="nowStudy2"
            name="nowStudy"
            type="radio"
            value="no"
            {...register("nowStudy", { required: true })}
            />
            <label htmlFor="nowStudy">いいえ</label>

            <input
            id="nowStudy3" 
            name="nowStudy" 
            type="radio" 
            value="unknown"
            {...register("nowStudy", { required: true })}
            />
            <label htmlFor="nowStudy">わからない</label>
            {errors.nowStudy && 
              <span style={{ color: "red" }}>このフィールドは回答必須です。</span>
            }
          </div>

          <div>
          <span>Q4. これまでに、プログラミングを学習したことがありますか？</span>
            <input 
            id="thePastStudy1" 
            name="thePastStudy" 
            type="radio" 
            value="yes" 
            {...register("thePastStudy", { required: true })}
            />  
            <label htmlFor="thePastStudy">はい</label>
            
            <input 
            id="thePastStudy2" 
            name="thePastStudy" 
            type="radio" 
            value="no"
            {...register("thePastStudy", { required: true })}
            />
            <label htmlFor="thePastStudy">いいえ</label>
            
            <input 
            id="thePastStudy3" 
            name="thePastStudy" 
            type="radio" 
            value="unknown"
            {...register("thePastStudy", { required: true })}
            />
            <label htmlFor="thePastStudy">わからない</label>
            {errors.thePastStudy && 
              <span style={{ color: "red" }}>このフィールドは回答必須です。</span>
            }
          </div>

          {/* 条件付きレンダリング */}
          {(watch("nowStudy") === "yes" || watch("thePastStudy") === "yes") && 
          <div>
            <label htmlFor="allLanguages">Q5. 今まで学習したことのあるプログラミング言語をすべて教えてください。</label>
            <Controller
              name="allLanguages"
              defaultValue=""
              control={control}
              render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />}
              />
              {/* <Controller
                name="name"
                defaultValue=""
                control={control}
                render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />}
              /> */}
          </div>
          }
          {/* {console.log(watch("nowStudy") === "yes" || watch("thePastStudy") === "yes" && "テスト")} */}

        <input type="submit" value="アンケートを提出する" variant="outlined"/>
        {/* <button type="submit">アンケートを提出する</button> 　ButtonタグでもOK　*/}
        </form>
        </Container>
    </>
  )
}

// index.js => /

// register(レジスター) => 「登録」
// ...register　=> 登録機能を呼び出して入力をフックに登録する

// required => 未入力時エラーメッセージを表示


// 疑問
// ①　Q18でのバリテーションをrulesになる理由が探せない。（他記事では見つけたが、公式で探せない）
// →使わなくても使えるなら使用可能だか、公式的には恐らくrulesを記述したほうが良い。(もう一度ドキュメントを見る)
// renderはinputタグの中で使用する想定で作られてしまっている為、それを解消するために、
// rulesというコントロールを渡してあげてuseFromに渡す的な。

// ②　Q19が不明。
// if文を使っていたが、見当違い。答えとしてはwatchを使用して条件付きレンダリングをする。
// React hook formには最適なレンダリングをする機能が備わっている。（Getスタディっと？だかをみると分かる。）
// 条件付きレンダリングに関してはToDoアプリの完了機能ボタンを参照する。


// React hook formについて
// ・register(レジスター)登録
// 　[...register]スプレット構文で渡して登録機能を呼び出してフックに登録する
// 　関数の第2引数には、HTML標準フォームデータ検証のルールが渡せる

// ・handleSubmit
// フォームの入力を確かめたうえで、引数に渡した関数(onSubmit)を呼び出す

// ・watch
// 引数に渡した名前の入力値を監視する

// ・formState: { errors }
// データ検証に失敗するとerrorsが返され、登録した名前で取り出せる


