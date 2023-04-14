
import { InputTest } from "./components/InputTest"
import { Timer } from "./components/Timer"

const colum: React.CSSProperties ={display:"flex", flexDirection:'column'}
const row: React.CSSProperties ={display:"flex", flexDirection:'row', justifyContent:"space-around"}
function App() {

return <section style={colum}><div style={row}>
<Timer cityCountry={"London"}/>
</div></section>
}
export default App

