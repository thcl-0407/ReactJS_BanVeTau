import DataPicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";
import lodash from "lodash";
import { useState, useEffect } from "react";
import { subDays } from "date-fns";
import Select from "react-select";
import KhachHangService from "../../../../services/KhachHang.Service";
import ToastifyMessage from "../../../../utilities/ToastifyMessage";
import AdminService from "../../../../services/Admin.Service";
import history from "./../../../../history";
var options = [];
var option=[]
registerLocale('vi', vi)
function ThemMoiLichTrinh(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [MaGaDi, setMaGaDi] = useState();
  const [MaGaDen, setMaGaDen] = useState();
  const [MaTau, setMaTau]= useState()

  useEffect(() => {
    KhachHangService.GetDanhSachNhaGa().then((response) => {
      response.data.data.forEach((item) => {
        //console.log(item)
        let temp_object = {
          value: item.MaNhaGa,
          label: item.TenNhaGa,
        };

        options.push(temp_object);
      });
    })
    
  }, [options]);

  useEffect(()=>{
    AdminService.GetDanhSachTau().then((response)=>{
      response.data.data.forEach((item)=>{
        let obj= {
          value: item.MaTau,
          label: item.TenTau
        }

        option.push(obj)
      })
    })
  },[option])
  
  const ThemLichTrinh = () => {
    
    let MaLichTrinh = document.getElementById("txtMaLichTrinh").value;

    if (lodash.isEmpty(MaTau)) {
      ToastifyMessage.ToastError("Tàu trống");
      return;
    }

    if (lodash.isEmpty(MaLichTrinh)) {
      ToastifyMessage.ToastError("lich trinh trống");
      return;
    }

    if (lodash.isEmpty(MaGaDi)) {
      ToastifyMessage.ToastError("Ga Đi Trống");
      return;
    }

    /*Kiểm tra ga đến trống */
    if (lodash.isEmpty(MaGaDen)) {
      ToastifyMessage.ToastError("Ga Đến Trống");
      return;
    }

    /*Kiểm tra ngày đi trống */
    if (lodash.isNil(startDate)) {
      ToastifyMessage.ToastError("Ngày đi không được trống");
      return;
    }

    if (startDate > endDate){
      ToastifyMessage.ToastError("Ngày đi phải nhỏ hơn ngày đến")
      return
    }

    if (MaGaDi.value == MaGaDen.value){
      ToastifyMessage.ToastError("Ga đi phải khác ga đến")
      return
    }

    let param = {
      MaTau: MaTau.value,
      MaLichTrinh: MaLichTrinh,
      MaGaDi: MaGaDi.value,
      MaGaDen: MaGaDen.value,
      ThoiGianDi: startDate,
      ThoiGianDen: endDate,
      TrangThai:1
    };

    AdminService.ThemLichTrinh(param).then((res) => {
      console.log("themLichTrinh", res);
      history.push("/Admin/QLLT");
      ToastifyMessage.ToastSuccess("Thêm thành công")
    });
  };

  const ChonMaGaDi = (selected) => {
    console.log("Chon Ma Ga Di", selected.value);
    setMaGaDi(selected);
  };

  const ChonMaGaDen = (selected) => {
    console.log("Chon Ma Ga Den", selected.value);
    setMaGaDen(selected);
  };

  const ChonTau= (selected)=>{
    console.log("Chon Tau", selected.value)
    setMaTau(selected)
  }
  return (
    <div style={{width: "42em", height: "28em"}}>
      <h1 className="text-center font-bold text-2xl">Thêm lịch trình</h1>
      <form className="m-2">
        <div className="grid grid-cols-2 m-2">
          <label>Mã Tàu</label>
          {/* <input type="text" placeholder="Mã tàu" id="txtMaTau" /> */}
          <Select options={option} onChange={ChonTau} id="txtTau"></Select>
        </div>
        <div className="grid grid-cols-2 m-2">
          <label>Mã lịch trình</label>
          <input type="text" placeholder="Mã lịch trình" id="txtMaLichTrinh" />
        </div>
        <div className="grid grid-cols-2 m-2">
          <label>Mã Ga Đi</label>

          <Select
            options={options}
            onChange={ChonMaGaDi}
            id="txtMaGaDi"
          ></Select>
        </div>
        <div className="grid grid-cols-2 m-2">
          <label>Mã Ga Đến</label>
          <Select
            options={options}
            onChange={ChonMaGaDen}
            id="txtMaGaDen"
          ></Select>
        </div>
        <div className="grid grid-cols-2 m-2">
          <label>Thời gian đi</label>
          <DataPicker
            className="border p-1.5"
            locale="vi"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={subDays(new Date(), 0)}
            
            dateFormat="yyyy-MM-dd"
            
          ></DataPicker>
        </div>
        <div className="grid grid-cols-2 m-2">
          <label>Thời gian đến</label>
          <DataPicker
            className="border p-1.5"
            locale="vi"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={subDays(new Date(), 0)}
            timeInputLabel="Time:"
            dateFormat="yyyy-MM-dd HH:mm"
            showTimeInput
          ></DataPicker>
        </div>

        <div className="pt-3 text-center m-2">
          <input
            // onClick={ThemNhanVien}
            type="button"
            onClick={ThemLichTrinh}
            defaultValue="Save"
            className="cursor-pointer px-6 py-1.5 border-2 border-main bg-main text-white hover:bg-white hover:text-main hover:pointer"
          />
        </div>
      </form>
    </div>
  );
}

export default ThemMoiLichTrinh;
