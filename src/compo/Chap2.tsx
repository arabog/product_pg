
interface Props {
          text: string,
          delimiter?: string;
}

const Chap2: React.FC<Props> = (props) => {

          const delimiter = "," ;
          const bits = props.text.split(delimiter)


          return (
                    <div>
                              {
                                        bits.map((bit: string) => (
                                                  <li key={bit}> 
                                                            {bit} 
                                                  </li>
                                        ))
                              }
                    </div>
          )
}


export default Chap2