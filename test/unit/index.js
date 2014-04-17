var should = require('should');
var multics = require('../../');


describe('extractFileName', function(){
    it('should handle the empty string', function(){    	
      multics.extractFileName('').should.eql({base:'/',title:''})
    })
    it('should handle the root directory', function(){    	
      multics.extractFileName('/').should.eql({base:'/',title:''})
    })
    it('should handle root file', function(){    	
      multics.extractFileName('/foo').should.eql({base:'/',title:'foo'})
    })
    it('should handle path with base', function(){    	
      multics.extractFileName('/foo/bar').should.eql({base:'/foo/',title:'bar'})
    })
    it('should handle root file with trailing slash', function(){    	
      multics.extractFileName('/foo/bar/').should.eql({base:'/foo/',title:'bar'})
    })
    it('should handle a long file path', function(){    	
      multics.extractFileName('/foo/bar/baz/taz/gaz').should.eql({base:'/foo/bar/baz/taz/',title:'gaz'})
    })
})

describe('cutPath', function(){
    it('should handle leading delimiter', function(){    	
      multics.cutPath('GET/hola/senyor/', 'GET').should.eql('/hola/senyor/')
    })
    it('should handle middle delimiter', function(){    	
      multics.cutPath('foo/GET/hola/senyor/', 'GET').should.eql('/hola/senyor/')
    })
    it('should handle end delimiter', function(){    	
      multics.cutPath('foo/GET/', 'GET').should.eql('/')
    })
    it('should handle end delimiter without trailing slash', function(){    	
      multics.cutPath('foo/GET', 'GET').should.eql('/')
    })
})

describe('singleTrailingSlash', function(){
    it('should handle empty string', function(){    	
      multics.singleTrailingSlash('').should.eql('/')
    })
    it('should handle empty root file', function(){    	
      multics.singleTrailingSlash('/').should.eql('/')
    })
    it('should handle root file', function(){    	
      multics.singleTrailingSlash('/foo').should.eql('/foo/')
    })
    it('should handle root file with trailing slash', function(){    	
      multics.singleTrailingSlash('/foo/').should.eql('/foo/')
    })
    it('should handle file with trailing slashes', function(){    	
      multics.singleTrailingSlash('/foo/bar//').should.eql('/foo/bar/')
    })
})

describe('removeTrailingSlash', function(){
    it('should handle empty string', function(){      
      multics.removeTrailingSlash('').should.eql('')
    })
    it('should handle empty root file', function(){     
      multics.removeTrailingSlash('/').should.eql('')
    })
    it('should handle root file', function(){     
      multics.removeTrailingSlash('/foo').should.eql('/foo')
    })
    it('should handle root file with trailing slash', function(){     
      multics.removeTrailingSlash('/foo/').should.eql('/foo')
    })
    it('should handle file with trailing slashes', function(){      
      multics.removeTrailingSlash('/foo/bar//').should.eql('/foo/bar')
    })
})

describe('expressjsPath', function(){
    it('should handle empty string', function(){    	
      multics.expressjsPath('').should.eql('')
    })
    it('should handle single file', function(){    	
      multics.expressjsPath('_foo_').should.eql(':foo')
    })
    it('should handle file', function(){    	
      multics.expressjsPath('/bar/_foo_/').should.eql('/bar/:foo/')
    })
    it('should handle file with param in the middle', function(){    	
      multics.expressjsPath('/bar/_foo_/baz').should.eql('/bar/:foo/baz')
    })
    it('should handle file with multiple params', function(){    	
      multics.expressjsPath('/bar/_foo_/_baz_/').should.eql('/bar/:foo/:baz/')
    })
})

describe('indexCheck', function(){
    it('should handle empty string', function(){    	
      multics.indexCheck('').should.eql('')
    })
    it('should handle root index', function(){    	
      multics.indexCheck('/index').should.eql('/')
    })
    it('should handle root index with trailing slash', function(){    	
      multics.indexCheck('/index/').should.eql('/')
    })
    it('should handle terminal index file', function(){    	
      multics.indexCheck('/foo/index/').should.eql('/foo/')
    })
    it('should handle terminal index file with trailing slash', function(){    	
      multics.indexCheck('/foo/index/').should.eql('/foo/')
    })
})

