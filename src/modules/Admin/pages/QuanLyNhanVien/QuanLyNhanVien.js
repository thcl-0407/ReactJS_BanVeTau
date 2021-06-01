import AdminService from "./../../../../services/Admin.Service";
import lodash from "lodash";
import ToastifyMessage from "./../../../../utilities/ToastifyMessage";
import history from "./../../../../history";
import { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ProfileChiTietNhanVien from "./ProfileChiTietNhanVien";
import React from "react";
import ThemNhanVien from "./ThemNhanVien";
//import TimKiemNhanVien from "./TimKiemNhanVien";

function QuanLyNhanVien(props) {
  const [data, setData] = useState([]);
  //const [showCreateModal,hideCreateModal]= useModal()
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [openChiTiet, setOpenChiTiet] = useState(false);
  const [selectSoDienThoai, setSelectSoDienThoai] = useState("");
  const [filtered, setFilterd] = useState([]);
  const [result, setResult] = useState("");

  const onOpenModalChiTiet = (SoDienThoai) => {
    console.log(SoDienThoai);
    setOpenChiTiet(true);
    setSelectSoDienThoai(SoDienThoai);
  };

  const onCloseModalChiTiet = () => setOpenChiTiet(false);

  useEffect(() => {
    AdminService.GetNhanVien().then((response) => {
      // console.log("getAll",response);
      setData(response.data.data);
      //setFilterd(response.data.data);
    });
  },[]);

  const TimKiemNhanVien = () => {
    let strKey = document.getElementById("txtSoDienThoaiTimKiem").value

    if(!lodash.isEmpty(strKey.trim())){  
      //console.log('tim kiem')
      AdminService.GetNhanVienBySDT(strKey).then((res)=>{
        console.log("log search", res)
        if (!res.data.data){
          ToastifyMessage.ToastError("Không tìm thấy số điện thoại này")
        } else{
        setData([res.data.data]);
        //setFilterd(res.data.data)
        }
      })
    }
  

    if (lodash.isEmpty(strKey)){
      AdminService.GetNhanVien().then((response) => {
        console.log(response);
        setData(response.data.data);
      });
    }
  };

  const isThemNhanVienThanhCong=()=>{
    onCloseModal(true)
  }

  const KhoaTaiKhoan=(MaNhanVien)=>{

    // let param={
    //   MaNhanVien: 'n456',
    //   isActive: 1
    // }
    let param={
      MaNhanVien: MaNhanVien
    }

    console.log("param", param)
    //console.log("mnv", props.MaNhanVien)
    // console.log("param", param)
    //console.log("a",props.MaNhanVien)
    AdminService.KhoaTaiKhoan(param).then((res)=>{
      console.log(res)
      ToastifyMessage.ToastSuccess("Khoá tài khoản thành công")
      //setData([res.data.data])
      //history.push("/Admin/QLNV")
      AdminService.GetNhanVien().then((response) => {
        // console.log("getAll",response);
        setData(response.data.data);
        //setFilterd(response.data.data);
      });
    })
  }

  const MoKhoaTaiKhoan= (MaNhanVien)=>{
    let param={
      MaNhanVien: MaNhanVien
    }

    AdminService.MoKhoaTaiKhoan(param).then((res)=>{
      ToastifyMessage.ToastSuccess("Mở khoá tài khoản thành công")
      //history.push("/Admin/QLNV")
      AdminService.GetNhanVien().then((response) => {
        // console.log("getAll",response);
        setData(response.data.data);
        //setFilterd(response.data.data);
      });
    })
  }

  return (
    <div className="flex justify-center pt-8">
      <div>
        <div className="flex">
          <button
            className="bg-blue-300 text-white py-1 px-3 rounded-sm text-xl mb-2 ml-10"
            onClick={onOpenModal}
          >
            Thêm mới nhân viên
          </button>
          {/* Quản lý modal thêm */}
          <Modal open={open} onClose={onCloseModal} center>
            <ThemNhanVien isSuccess={isThemNhanVienThanhCong}/>
          </Modal>
          <input
            className="ml-96 border border-4 mb-2"
            type="text"
            id="txtSoDienThoaiTimKiem"
            placeholder="Tìm bằng số điện thoại"
            defaultValue={result}/>
          <button onClick={TimKiemNhanVien} className="bg-blue-300 text-white py-1 px-3 rounded-sm text-xl mb-2">Tìm kiếm</button>
          {/* {filtered.map((item, index) => (
            
            <tr
                  key={index}
                  className="bg-white border px-8 py-4 text-center"
                >
                  <td className="px-2 py-2">{index + 1}</td>
                  <td>{item.MaNhanVien}</td>
                  <td>{item.HoTenNhanVien}</td>
                  <td>{item.SoDienThoai}</td>
                  <td>{item.CaLamViec}</td>
            </tr>
          ))} */}
        </div>

        <table className="border-collapse border border-green-800 shadow-lg bg-white ml-10">
          <thead className="table-header-group">
            <tr className="bg-blue-100 border text-left px-8 py-4">
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                STT
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Mã nhân viên
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Họ tên nhân viên
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Số điện thoại
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Ca làm việc
              </th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4"></th>
              <th className="w-1/8 bg-blue-100 border text-left px-8 py-4">
                Hoạt động
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {console.log(data)} */}
            {data.map(function (item, index) {
              return (
                <tr
                  key={index}
                  className="bg-white border px-8 py-4 text-center"
                >
                  <td className="px-2 py-2">{index + 1}</td>
                  <td>{item.MaNhanVien}</td>
                  <td>{item.HoTenNhanVien}</td>
                  <td>{item.SoDienThoai}</td>
                  <td>{item.CaLamViec}</td>
                  <td>
                    <button
                      className="underline text-blue-400"
                      onClick={onOpenModalChiTiet.bind(null, item.SoDienThoai)}
                    >
                      Chi tiết
                    </button>
                  </td>
                  {/* <td className="bg-blue-200 text-purple-600 py-1 px-2 rounded-2xl text-xs my-1"></td> */}
                  <td>
                    
                      {item.isActive==0? (
                        <button className="bg-red-500 rounded-2xl" onClick={()=> MoKhoaTaiKhoan(item.MaNhanVien)}>Mở khoá</button>
                      ): ( <button className="bg-green-300 rounded-2xl" onClick={()=> KhoaTaiKhoan(item.MaNhanVien)}>Khoá tài khoản</button>)}
                    
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div></div>
        <React.Fragment>
          <Modal open={openChiTiet} onClose={onCloseModalChiTiet} center>
            <ProfileChiTietNhanVien
              SoDienThoai={selectSoDienThoai}
            ></ProfileChiTietNhanVien>
          </Modal>
        </React.Fragment>
      </div>
    </div>
  );
}

export default QuanLyNhanVien;
