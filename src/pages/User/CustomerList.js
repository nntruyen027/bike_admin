export default function CustomerList({list}) {
    return (
        <table>
            <thead>
            <tr>
                <th>
                    Người dùng
                </th>
                <th>
                    Điểm
                </th>
                <th>
                    Số điện thoại
                </th>
                <th>
                    Quyền
                </th>
                <th>
                    Loại
                </th>
            </tr>
            </thead>
            <tbody>
            {list.map((item) => <ItemList item={item} />)}
            </tbody>
        </table>
    )
}

function ItemList({item}) {
    return (
        <tr>
            <td>{item.full_name}</td>
            <td>{item.point}</td>
            <td>{item.phone_number}</td>
            <td>{item.permission}</td>
            <td>{item.type}</td>
        </tr>
    )
}