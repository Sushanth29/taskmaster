import React from "react";

export default function TableComponent(props) {
  const { headers, data } = props;
  return (
    <table class="table">
      <thead>
        <tr>
          {headers?.map((item) => (
            <th scope="col">#</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {/* {
                data?.map((item)=>{
                   Object.entries() 
                })
            } */}
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </table>
  );
}
