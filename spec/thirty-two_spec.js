/*                                                                             
Copyright (c) 2011, Chris Umbel                                                
                                                                                
Permission is hereby granted, free of charge, to any person obtaining a copy    
of this software and associated documentation files (the "Software"), to deal   
in the Software without restriction, including without limitation the rights    
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell       
copies of the Software, and to permit persons to whom the Software is           
furnished to do so, subject to the following conditions:                        
                                                                                
The above copyright notice and this permission notice shall be included in      
all copies or substantial portions of the Software.                             
                                                                                
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR      
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,        
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE     
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER          
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,   
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN       
THE SOFTWARE.                                                                   
*/
if(!expect){
	function expect(a){
		return {
			toBe: function(b){
				require('assert').strictEqual(a, b);
			}
		};
	}
}
import { default as base32 } from '../lib/thirty-two/index.js';

describe('thirty-two', function() {
    var textDecoder=new TextDecoder();
    var textEncoder=new TextEncoder();
    it('should encode', function() {
        expect(base32.encode('a').toString()).toBe('ME======');
        expect(base32.encode('be').toString()).toBe('MJSQ====');
        expect(base32.encode('bee').toString()).toBe('MJSWK===');
        expect(base32.encode('beer').toString()).toBe('MJSWK4Q=');
        expect(base32.encode('beers').toString()).toBe('MJSWK4TT');
        expect(base32.encode('beers 1').toString()).toBe('MJSWK4TTEAYQ====');
        expect(base32.encode('shockingly dismissed').toString()).toBe('ONUG6Y3LNFXGO3DZEBSGS43NNFZXGZLE');        
    });
    
    
    it('should decode', function() {
        expect(textDecoder.decode(base32.decode('ME======'))).toBe('a');
        expect(textDecoder.decode(base32.decode('MJSQ===='))).toBe('be');
        expect(textDecoder.decode(base32.decode('ONXW4==='))).toBe('son');
        expect(textDecoder.decode(base32.decode('MJSWK==='))).toBe('bee');
        expect(textDecoder.decode(base32.decode('MJSWK4Q='))).toBe('beer');
        expect(textDecoder.decode(base32.decode('MJSWK4TT'))).toBe('beers');
        expect(textDecoder.decode(base32.decode('mjswK4TT'))).toBe('beers');
        expect(textDecoder.decode(base32.decode('MJSWK4TTN5XA===='))).toBe('beerson');
        expect(textDecoder.decode(base32.decode('MJSWK4TTEAYQ===='))).toBe('beers 1');
        expect(textDecoder.decode(base32.decode('ONUG6Y3LNFXGO3DZEBSGS43NNFZXGZLE'))).toBe('shockingly dismissed');
    });
    
    it('should be binary safe', function() {
        expect(base32.decode(base32.encode(Uint8Array.from([0x00, 0xff, 0x88]))).toString()).toBe('0,255,136');
    	expect(base32.encode(Uint8Array.from([0xf6, 0x1e, 0x1f, 0x99, 0x8d, 0x69, 0x15, 0x1d, 0xe8, 0x33, 0x4d, 0xbe, 0x75, 0x3a, 0xb1, 0x7a, 0xe8, 0x31, 0xc1, 0x38, 0x49, 0xa6, 0xae, 0xcd, 0x95, 0xd0, 0xa4, 0xe5, 0xdc, 0x25])).toString()).toBe('6YPB7GMNNEKR32BTJW7HKOVRPLUDDQJYJGTK5TMV2CSOLXBF');
    	expect(base32.decode('6YPB7GMNNEKR32BTJW7HKOVRPLUDDQJYJGTK5TMV2CSOLXBF').toString()).toBe('246,30,31,153,141,105,21,29,232,51,77,190,117,58,177,122,232,49,193,56,73,166,174,205,149,208,164,229,220,37');
    });
});
window.base32=base32;
