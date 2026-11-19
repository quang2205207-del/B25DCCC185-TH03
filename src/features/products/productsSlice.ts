import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types";

interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string; state: { products: ProductsState } }
>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        return rejectWithValue(`Không thể tải sản phẩm (HTTP ${response.status}).`);
      }

      const data: unknown = await response.json();
      if (!Array.isArray(data) || !data.every(isProduct)) {
        return rejectWithValue("Dữ liệu sản phẩm không hợp lệ.");
      }

      return data;
    } catch {
      return rejectWithValue("Không thể kết nối máy chủ. Vui lòng thử lại.");
    }
  },
  {
    condition: (_, { getState }) => getState().products.status !== "loading" && getState().products.status !== "succeeded",
  },
);

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  return (
    "id" in value && typeof value.id === "number" &&
    "title" in value && typeof value.title === "string" &&
    "price" in value && typeof value.price === "number" &&
    "description" in value && typeof value.description === "string" &&
    "category" in value && typeof value.category === "string" &&
    "image" in value && typeof value.image === "string"
  );
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Đã có lỗi xảy ra.";
      });
  },
});

export default productsSlice.reducer;
