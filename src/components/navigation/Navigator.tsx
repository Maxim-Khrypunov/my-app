import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { TypeOFRouteForNavigator } from "../../model/TypeOFRouteForNavigator"
import {useEffect} from "react"
import './navigators.css'

type Props=
{
    subnavigator?:boolean,
    route:TypeOFRouteForNavigator[]  
}
export const Navigator: React.FC<Props> =({subnavigator,route}) =>
{
    const navigator = useNavigate()
   useEffect(()=>{ 
   if(!subnavigator)
   {navigator(route[0].path)}},[])

    function getElements()
    {
        return route.map((elem,index)=>
        <li className="navigator-item"><NavLink to={elem.path} key={index}>{elem.element}</NavLink></li>
        )
    }

    return <div style={{marginTop:"10vh"}}>
    <ul className={`subnavigator-item ${subnavigator ? 'subnavigator-sublist' : ''}`}>{getElements()}</ul>  
    <Outlet></Outlet>
    </div>
}
