package solution

import (
	"testing"
)

func TestSum(t *testing.T) {
	tests := []struct {
		a, b, want int
	}{
		{1, 2, 3},
		{-1, 1, 0},
		{100, 200, 300},
		{0, 0, 0},
	}

	for _, tt := range tests {
		got := Sum(tt.a, tt.b)
		if got != tt.want {
			t.Errorf("Sum(%d, %d) = %d; want %d", tt.a, tt.b, got, tt.want)
		}
	}
}
