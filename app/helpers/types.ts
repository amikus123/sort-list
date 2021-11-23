export interface ListItem{
  id:string,
  text:string,
  color:string,
  show:boolean
}

export interface Template{
  title:string;
  content:string[]
}
export interface List{
  title:string,
  description:string,
  content:string[];
}