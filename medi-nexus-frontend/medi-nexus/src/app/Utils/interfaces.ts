import { ChangeEvent, ReactNode } from "react";



interface AppFormData {
    [key: string]: string; // Define a generic key-value structure for form fields
  }
interface AppUser{
    app_user: { id: string; username: string } | null;
}
interface formChildProps {
  formData: AppFormData;
  
  setFormData: React.Dispatch<React.SetStateAction<AppFormData>>;
  buttonLabel: string;
  buttonAction: ()=>void
}
  
interface LoaderInterface{
  isOpen: any;
  progressLabel?:string
}
 interface TypographyInterface{
  className?:string
   children: any
   variant?: any
   fontSize:number

 }

 interface ContentCardInterface{
   icon?:any,
   header?: string,
   h1?:any,
   h2?:any,
   h3?: any,
   h4?: any,
   minHeight: any,
   minWidth:any,
   buttonLabel?:string,
   content?: any,
   
 }
 interface IconInterface{
   icon:any,
   color: any,
   size:any,
   className?:any,
   
 }
interface SearchInputInterface{
  className: string
  
 }
 interface NavigaitonInterface{
   icon: any,
   label: string,
   onClick: (label:string)=>(any),
   color:string,
   
 }
interface progressBarInterface{
  percentage: number;
}
interface ValueBasedCardInterface{
  icon?:any,
  header?: string,
  color?: string,
  accent?:string,
  value?: string,
  percentile?: number,
  content?: any,
  
}
interface listTable{
  tableLable: string,
  columnNames: string[],
  rowData:object
}
interface ContainerInterface {
  children: ReactNode;
}
interface AppButtonInterface {
  onClick: () => void;
  label?: any;
  icon?: any,
  bgColor?:string,
  isNotDefault?:boolean,
  className?: string; // This is optional for additional custom classes
}
interface DroppableInterface{
  onValueChange: (value: string) => (any),
  onItemDropped: (value:string) => void
}
interface FormInputInterface {
  inputType: string,
  maxLength?: number,
  id: string,
  file?:any,
  key: number;
  ref?: React.RefObject<HTMLInputElement>,
  type?:any
  value:string,
  className: string,
placeHolder: string,
fieldName: string,
onChange: (fieldName: string, value: string,event?:any) => void
onCustomChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface photoInterface{
  src: string,
  className: string
}
interface bannerInterface{
  appUserFullName: string | null,
  speciality: string | null,
  className:string,
  src:string
}

interface AuthenticationServiceInterface{
  validateUserOnAD(username: string, password: string): Promise<any>,
  getUserID(username:string):string
}

export type {
  LoaderInterface, TypographyInterface, formChildProps, AppFormData, FormInputInterface,
  AppUser, ContentCardInterface, ValueBasedCardInterface, progressBarInterface,
  IconInterface, NavigaitonInterface, photoInterface, bannerInterface, AppButtonInterface,
  ContainerInterface,listTable, SearchInputInterface, AuthenticationServiceInterface, DroppableInterface
}